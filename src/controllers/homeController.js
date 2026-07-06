import { Router } from 'express';
import movieService from '../services/movieService.js';

const homeController = Router();


homeController.get('/', async (req, res) => {

    const movies = await movieService.getAll();

    res.render('home', { title: 'Home Page', movies: movies || [] });
});


homeController.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});




export default homeController;