import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes.js';

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

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});