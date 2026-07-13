import movieRepository from "../repositories/movieRepository.js";

function getAll(filter = {}) {

    if (filter.year) {
        filter.year = Number(filter.year);
    }
    return movieRepository.getAll(filter)
}

function create(movieData) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);

    return movieRepository.create(movieData);
}

function getById(movieId) {
    const id = Number(movieId);
    return movieRepository.getById(id);
}

function deleteById(movieId) {
    const id = Number(movieId);
    return movieRepository.deleteById(id);
}

const movieService = {
    getAll,
    create,
    getById,
    deleteById,
};

export default movieService;