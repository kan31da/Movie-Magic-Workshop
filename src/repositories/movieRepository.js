import fs from 'fs/promises';

 async function getAllMovies() {

    const content = await fs.readFile('./src/db.json', 'utf-8');
    const db = JSON.parse(content);

    return db.movies;
}

const movieRepository = {
    getAllMovies
};

export default movieRepository;