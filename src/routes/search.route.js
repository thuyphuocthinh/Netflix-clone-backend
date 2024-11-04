import express from "express";
import * as searchController from "../controllers/search.controller.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";
const router = express.Router();

router.use(protectRoute);

router.get("/person/:query", searchController.searchPerson);
router.get("/movie/:query", searchController.searchMovie);
router.get("/tv/:query", searchController.searchTv);
router.get("/history", searchController.getSearchHistory);
router.delete("/history/delete/:id", searchController.removeItemFromSearchHistory);

export default router;
