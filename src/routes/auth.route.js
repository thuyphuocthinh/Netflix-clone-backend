import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/authCheck", protectRoute, authController.authCheck)

export default router;
