import { Router } from "express";
import artistService from "../services/artistService";
import { isAuth } from '../middlewares/authMiddleware';

const artistController = Router();

artistController.get("/create", isAuth, (req, res) => {
    res.render("artists/create")
});

artistController.post("/create", isAuth, async (req, res) => {
    const artistData = req.body;

    const artist = await artistService.create(artistData);

    res.redirect('/');
});

export default artistController;