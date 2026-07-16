import { Router } from "express";

import { createRoom } from "../controllers/room.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @route POST /api/rooms/create
 * @desc Create a new collaboration room
 * @access Private
 */
router.post("/create", protect, createRoom);

export default router;