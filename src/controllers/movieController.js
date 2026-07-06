import { Router } from 'express';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create', { title: 'Create Movie' });
});

export default movieController;