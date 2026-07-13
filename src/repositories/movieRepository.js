import { prisma } from '../lib/prisma';

async function getAll(filter = {}) {

    if (filter.search) {
        return await prisma.movie.findMany({
            where: { title: filter.search },
        });
    }

    if (filter.genre) {
        return await prisma.movie.findMany({
            where: { genre: filter.genre },
        });
    }

    if (filter.year) {
        return await prisma.movie.findMany({
            where: { year: filter.year },
        });
    }

    return await prisma.movie.findMany();;
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

async function deleteById(movieId) {
    const movie = await prisma.movie.delete({
        where: { id: movieId },
    });

    return movie;
}

const movieRepository = {
    getAll,
    create,
    getById,
    deleteById,
};

export default movieRepository;