import { Router } from 'express';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create', { title: 'Create Movie' });
});

movieController.post('/create', (req, res) => {

    const { title, category, genre, director, year, image, rating, description } = req.body;

    console.log({ title, category, genre, director, year, image, rating, description });

    
});

export default movieController;