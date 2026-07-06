import express from 'express';
import { engine } from 'express-handlebars';

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

app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});