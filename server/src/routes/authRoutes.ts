import { Router } from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * Register
 */
router.post("/register", registerUser);

/**
 * Login
 */
router.post("/login", loginUser);

/**
 * Current Logged-in User
 */
router.get("/me", protect, getCurrentUser);

export default router;