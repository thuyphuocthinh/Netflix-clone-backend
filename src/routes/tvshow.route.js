import express from "express";
import * as tvshowController from "../controllers/tvshow.controller.js";
const router = express.Router();

router.get("/trending", tvshowController.getTrending);
router.get("/:id/trailers", tvshowController.getTvTrailer);
router.get("/:id/details", tvshowController.getTvDetail);
router.get("/:id/similar", tvshowController.getSimilarTvs);
router.get("/:category", tvshowController.getTvsByCategory);

export default router;
