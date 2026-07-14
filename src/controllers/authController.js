import { Router } from "express";
import authService from '../services/authService.js'

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register' });
});

authController.post('/register', async (req, res) => {

    const { email, password, repeatPassword } = req.body;

    const user = await authService.register({ email, password, repeatPassword });

    res.redirect('/');
});

authController.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login' });
});

authController.get('/logout', (req, res) => {
    res.redirect('/');
});

export default authController;