import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js'

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

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    console.log("Controller movieId:", req.params.movieId);

    const movie = await movieService.getById(movieId);

    const rating = Number(movie.rating);
    const stars = '&#x2605; '.repeat(Math.floor(rating));

    res.render('movies/details', { title: 'Movie Details', movie, stars });
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId);

    const artists = await artistService.getAll({ exclude: movie.artists.map(artist => artist.id) });

    res.render('movies/attach', { title: 'Attach Movie', movie, artists });
});

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});


movieController.delete('/delete/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    await movieService.deleteById(movieId);
    res.redirect('/');
});

export default movieController;