import { Router } from 'express';
import movieService from '../services/movieService.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create', { title: 'Create Movie' });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query || '';
    const movies = await movieService.getAll(filter);

    res.render('movies/search', { title: 'Search Results', movies: movies, filter: filter || '' });
});


movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.create(newMovie);

    res.redirect('/');
});

movieController.get('/details/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieService.getById(movieId);

    const rating = Number(movie.rating);
    const stars = '&#x2605; '.repeat(Math.floor(rating));

    res.render('movies/details', { title: 'Movie Details', movie, stars });
});

movieController.delete('/delete/:id', async (req, res) => {
    const movieId = req.params.id;
    await movieService.deleteById(movieId);
    res.redirect('/');
});

export default movieController;