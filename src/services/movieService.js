import movieRepository from "../repositories/movieRepository.js";

async function getAll(filter = {}) {

    if (filter.year) {
        filter.year = Number(filter.year);
    }
    return await movieRepository.getAll(filter)
}

async function create(movieData, userId) {
    // movieData.rating = Number(movieData.rating);
    // movieData.year = Number(movieData.year);
    movieData.userId = userId;

    return await movieRepository.create(movieData);
}

async function getById(movieId) {
    const id = Number(movieId);

    return await movieRepository.getById(id);
}

async function attachArtist(movieId, artistId) {
    const movieIdNumber = Number(movieId);
    const artistIdNumber = Number(artistId);

    const result = await movieRepository.attachArtist(movieIdNumber, artistIdNumber);

    return result;
}

async function deleteById(movieId, userId) {

    const movie = await movieRepository.getById(movieId);

    if (!movie) {
        throw new Error('Movie not found');
    }

    if (movie.userId !== userId) {
        throw new Error('Unauthorized');
    }

    await movieRepository.deleteById(movieId, userId);
}

async function edit(movieId, userId, editMovie) {
    editMovie.rating = Number(editMovie.rating);
    editMovie.year = Number(editMovie.year);
    editMovie.userId = userId;

    return await movieRepository.edit(movieId, userId, editMovie);
}

const movieService = {
    getAll,
    create,
    getById,
    attachArtist,
    edit,
    deleteById,
};

export default movieService;