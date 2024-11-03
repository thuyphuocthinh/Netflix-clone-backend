import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log(`MongoDB connected success: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connected error");
    // 1 - error
    // 0 - succses
    // process of node
    process.exit(1);
  }
};
