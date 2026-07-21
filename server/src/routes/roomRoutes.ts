import { Router } from "express";

import {
  createRoom,
  joinRoom,
  getRoom,
} from "../controllers/roomController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * Create Room
 * POST /api/rooms/create
 */
router.post("/create", protect, createRoom);

/**
 * Join Room
 * POST /api/rooms/join
 */
router.post("/join", protect, joinRoom);

/**
 * Get Room
 * GET /api/rooms/:roomId
 */
router.get("/:roomId", protect, getRoom);

export default router;