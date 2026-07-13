import { prisma } from '../lib/prisma';

async function getAll(filter = {}) {
    let movies = await prisma.movie.findMany();


    //TODO TODO TODO implement database filtering

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
    const movie = await prisma.movie.create({
        data: movieData
    })

    return movie;
}

async function getById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if (!movie) {
        throw new Error('No movies found!');
    }

    return movie;
}

const movieRepository = {
    getAll,
    create,
    getById,
};

export default movieRepository;