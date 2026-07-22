import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js'
import { isAuth } from '../middlewares/authMiddleware.js';
import { createMovieSchema } from '../schemas/movieSchema.js';

import * as z from "zod";//TODO TODO TODO

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

    try {

        const movieData = createMovieSchema.parse(newMovie);

        await movieService.create(movieData, userId);
        res.redirect('/');
    } catch (error) {

        // if (error instanceof z.ZodError) {
        //     const errors = z.flattenError(error).fieldErrors;

        //     const categoryOptions = prepareCategoryViewData(newMovie);

        //     res.status(400).render('movies/create', {
        //         title: 'Create Movie',
        //         movie: newMovie,
        //         error: Object.values(errors).flat(),
        //         errors,
        //         categoryOptions
        //     });
        // }

        let errors = {};
        let errorMessage = null;

        const categoryOptions = prepareCategoryViewData(newMovie);

        if (error.name === 'ZodError') {

            errors = z.flattenError(error).fieldErrors;

        } else if (error.name === 'PrismaClientKnownRequestError') {

            switch (error.code) {

                case 'P2002':
                    errors = { title: ['Title must be unique'] };
                    break;

                case 'P2003':
                    errors = { category: ['Invalid category'] };
                    break;

                default:
                    errorMessage = `Database error happened: Code ${error.code}`;
            }

        } else {

            errorMessage = error.message || 'An unexpected error occurred';
        }

        res.status(400).render('movies/create', {
            title: 'Create Movie',
            movie: newMovie,
            error: errorMessage,
            errors,
            categoryOptions
        });
    }
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

function prepareCategoryViewData(movie) {
    const categories = ['TV Show', 'Animation', 'Movie', 'Documentary', 'Short Film'];

    const categoryOptions = categories.map(category => {

        const value = category.toLocaleLowerCase().replaceAll(' ', '-');

        const option = {
            value,
            label: category,
            selected: movie.category === value,// ? 'selected' : '', or app.engine helpers: isSelected()
        };

        return option;
    });

    return categoryOptions;
}

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.userId;

    const movie = await movieService.getById(movieId);
    const categoryOptions = prepareCategoryViewData(movie);

    res.render('movies/edit', { movie, categoryOptions });
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