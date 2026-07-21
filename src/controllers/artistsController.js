import { Router } from "express";
import artistService from "../services/artistService";
import { isAuth } from '../middlewares/authMiddleware';
import { createArtistSchema } from "../schemas/artistSchema";
import { getErrorMessage } from "../utils/errorUtils";

const artistController = Router();

artistController.get("/create", isAuth, (req, res) => {
    res.render("artists/create")
});

artistController.post("/create", isAuth, async (req, res) => {

    try {

        const artistData = createArtistSchema.parse(req.body);

        const artist = await artistService.create(artistData);

        res.redirect('/');

    } catch (error) {

        const errorMessage = getErrorMessage(error);

        res.status(400).render("artists/create", {
            artist: req.body,
            errors: errorMessage,
            error: errorMessage,
            pageTitle: "Create Artist"
        });
    }
});

export default artistController;