import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';

async function readDb(collection) {
    const content = await fs.readFile('./src/db.json', { encoding: 'utf-8' });
    const db = JSON.parse(content);

    if (collection && !db.hasOwnProperty(collection)) {
        throw new Error('No collection');
    }

    return collection ? db[collection] : db;
}

async function writeDb(db) {
    const content = JSON.stringify(db, null, 2);

    await fs.writeFile('./src/db.json', content, { encoding: 'utf-8' });
}

async function getAll(filter = {}) {
    let movies = await readDb('movies');

    if (filter.search) {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    }

    if (filter.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    }

    if (filter.year) {
        movies = movies.filter(movie => movie.year === filter.year);
    }

    return movies;
}

async function create(movieData) {
    movieData.id = uuid();

    const db = await readDb();

    db.movies.push(movieData);

    await writeDb(db);
}

async function getById(id) {
    const movies = await readDb('movies');

    return movies.find((movie) => movie.id === id);
}

const movieRepository = {
    getAll,
    create,
    getById,
};

export default movieRepository;