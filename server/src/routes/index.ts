import { Router } from "express";

import authRoutes from "./authRoutes";
import roomRoutes from "./roomRoutes";

const router = Router();

/**
 * Root Route
 */
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    project: "SyncSpace",
    message: "Welcome to SyncSpace Backend 🚀",
    version: "1.0.0",
  });
});

/**
 * Authentication Routes
 */
router.use("/api/auth", authRoutes);

/**
 * Room Routes
 */
router.use("/api/rooms", roomRoutes);

export default router;