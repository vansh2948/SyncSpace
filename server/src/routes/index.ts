import { Router } from "express";

import authRoutes from "./authRoutes";

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

export default router;