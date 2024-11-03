import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";
import { connectDB } from "./src/config/db.config.js";
import { ENV_VARS } from "./src/config/envVars.js";

const app = express();
const PORT = ENV_VARS.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Netflix backend listening on port ${PORT}`);
});
