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

const movieService = {
    getAll,
    create,
    getById,
};

export default movieService;