import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler";
import User from "../models/User";
import env from "../config/env";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let token: string | undefined;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
  }
);