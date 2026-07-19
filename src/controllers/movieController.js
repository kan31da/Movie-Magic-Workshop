import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js'
import { isAuth } from '../middlewares/authMiddleware.js';

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query || '';

    const movies = await movieService.getAll(filter);

    res.render('movies/search', { title: 'Search Results', movies: movies, filter: filter || '' });
});

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create', { title: 'Create Movie' });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.userId;

    await movieService.create(newMovie, userId);

    res.redirect('/');
});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req?.user?.userId;

    const movie = await movieService.getById(movieId);

    const isOwner = movie.userId && movie.userId === userId;

    const rating = Number(movie.rating);
    const stars = '&#x2605; '.repeat(Math.floor(rating));

    res.render('movies/details', { title: 'Movie Details', movie, stars, isOwner });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId);

    const artists = await artistService.getAll({ exclude: movie.artists.map(artist => artist.id) });

    res.render('movies/attach', { title: 'Attach Movie', movie, artists });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.userId;

    const movie = await movieService.getById(movieId);

    res.render('movies/edit', { movie });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.userId;
    const editMovie = req.body;

    const movie = await movieService.edit(movieId, userId, editMovie);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.userId;

    await movieService.deleteById(movieId, userId);

    res.redirect('/');
});

export default movieController;