import { Router } from 'express';

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import artistsController from './controllers/artistsController.js';

const routes = Router();

routes.use('/', homeController);
// routes.use('/about', homeController);

routes.use('/movies', movieController);

routes.use('/artists', artistsController);

routes.get('*url', (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

export default routes;