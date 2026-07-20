import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {

    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;

    } catch (error) {
        res.clearCookie('auth');
        return res.redirect('/');
    }

    next();
}

export function isAuth(req, res, next) {

    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

export function isGuest(req, res, next) {

    if (req.user) {
        return res.redirect('/');
    }

    next();
}