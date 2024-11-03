import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All signup fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    const checkUserNameExist = await User.findOne({ username });
    if (checkUserNameExist) {
      return res
        .status(400)
        .json({ success: false, error: "Username already exists" });
    }

    const checkEmailExist = await User.findOne({ email });
    if (checkEmailExist) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const user = new User({
      username,
      email,
      password: hashPassword,
      image,
    });

    if (user) {
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      return res.status(201).json({
        success: true,
        user: {
          username: user.username,
          email: user.email,
          searchHistory: user.searchHistory,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Error in creating new user",
      });
    }
  } catch (error) {
    console.log(">>> error in signup: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All signup fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(201).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        searchHistory: user.searchHistory,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(">>> error in login controller: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(">>> error in logout controller: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log(">>> error in logout controller: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
