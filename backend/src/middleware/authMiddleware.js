import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

// Protect middleware
export const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed!" });
  }
});

// Admin middleware
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Only admins can do this!" });
});

// Creator middleware
export const creatorMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.role === "creator" || req.user.role === "admin")) {
    return next();
  }
  return res.status(403).json({ message: "Only creators can do this!" });
});

// Verified middleware
export const verifiedMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    return next();
  }
  return res.status(403).json({ message: "Please verify your email address!" });
});
