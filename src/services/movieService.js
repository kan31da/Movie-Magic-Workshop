import movieRepository from "../repositories/movieRepository.js";

async function getAll(filter = {}) {

    if (filter.year) {
        filter.year = Number(filter.year);
    }
    return await movieRepository.getAll(filter)
}

async function create(movieData) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);

    return await movieRepository.create(movieData);
}

async function getById(movieId) {    
    const id = Number(movieId);

    return await movieRepository.getById(id);
}

function deleteById(movieId) {
    const id = Number(movieId);
    return movieRepository.deleteById(id);
}

async function attachArtist(movieId, artistId) {
    const movieIdNumber = Number(movieId);
    const artistIdNumber = Number(artistId);

    const result = await movieRepository.attachArtist(movieIdNumber, artistIdNumber);

    return result;
}

const movieService = {
    getAll,
    create,
    getById,
    deleteById,
    attachArtist,
};

export default movieService;