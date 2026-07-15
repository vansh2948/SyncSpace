import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import generateToken from "../utils/jwt";

/**
 * Register User
 * POST /api/auth/register
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists.",
      });
      return;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT
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