import express from 'express';
import { engine } from 'express-handlebars';
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

const app = express();

app.engine('hbs', engine(
    {
        extname: 'hbs',
        // defaultLayout: 'main',
        // layoutsDir: './src/views/layouts/',
    }
));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('./src/public'));


app.use('/', homeController);
// app.use('/about', homeController);

app.use('/movies', movieController);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});