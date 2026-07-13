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

async function deleteById(movieId) {
    const movie = await prisma.movie.delete({
        where: { id: movieId },
    });

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

const movieRepository = {
    getAll,
    create,
    getById,
    deleteById,
    attachArtist,
};

export default movieRepository;