import { Router } from "express";

const router = Router();

// Root Route
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    project: "SyncSpace",
    message: "Welcome to SyncSpace Backend 🚀",
    version: "1.0.0",
  });
});

export default router;