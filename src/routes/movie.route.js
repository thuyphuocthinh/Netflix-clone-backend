import express from "express";
import * as movieController from "../controllers/movie.controller.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";
const router = express.Router();

router.use(protectRoute);

router.get("/trending", movieController.getTrending);
router.get("/:id/trailers", movieController.getMovieTrailer);
router.get("/:id/details", movieController.getMovieDetail);
router.get("/:id/similar", movieController.getSimilarMovies);
router.get("/:category", movieController.getMoviesByCategory);

export default router;
