import { prisma } from '../lib/prisma';

async function getAll(filter = {}) {

    const movies = await prisma.movie.findMany({
        where: {
            year: filter.year || undefined,
            genre: {
                //equals: filter.genre,
                contains: filter.genre || undefined,
                mode: 'insensitive'
            },
            title: {
                contains: filter.search,
                mode: 'insensitive'
            },
        }
    });

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
        include: {
            artists: true
        }
    });

    if (!movie) {
        throw new Error('No movies found!');
    }

    return movie;
}

async function attachArtist(movieId, artistId) {
    const result = await prisma.movie.update({
        where: { id: movieId },
        data: {
            artists: {
                connect: { id: artistId }
            }
        }
    });

    return result;
}

async function edit(movieId, userId, editMovie) {
    const movie = await prisma.movie.update({
        where: { id: movieId, userId: userId },
        data: {
            ...editMovie,
        }
    })

    return movie;
}

async function deleteById(movieId, userId) {
    await prisma.movie.delete({
        where: { id: movieId, userId: userId },
    });
}

const movieRepository = {
    getAll,
    create,
    getById,
    attachArtist,
    edit,
    deleteById,
};

export default movieRepository;