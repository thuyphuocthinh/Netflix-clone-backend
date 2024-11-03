import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";
import movieRoutes from "./src/routes/movie.route.js";
import tvRoutes from "./src/routes/tvshow.route.js";
import searchRoutes from "./src/routes/search.route.js";
import { connectDB } from "./src/config/db.config.js";
import { ENV_VARS } from "./src/config/envVars.js";

const app = express();
const PORT = ENV_VARS.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes);
app.use("/api/v1/search", searchRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Netflix backend listening on port ${PORT}`);
});
