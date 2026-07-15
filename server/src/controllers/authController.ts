import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import generateToken from "../utils/jwt";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Register User
 * POST /api/auth/register
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists.",
      });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  }
);

/**
 * Login User
 * POST /api/auth/login
 */
export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  }
);

/**
 * Get Current User
 * GET /api/auth/me
 */
export const getCurrentUser = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);