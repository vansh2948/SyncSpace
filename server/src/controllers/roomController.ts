import { Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import roomService from "../services/roomService";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Create Room
 * POST /api/rooms/create
 */
export const createRoom = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const room = await roomService.createRoom(req.user._id.toString());

    res.status(201).json({
      success: true,
      message: "Room created successfully.",
      room,
    });
  }
);

/**
 * Join Room
 * POST /api/rooms/join
 */
export const joinRoom = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { roomId } = req.body;

    if (!roomId) {
      res.status(400).json({
        success: false,
        message: "Room ID is required.",
      });
      return;
    }

    const room = await roomService.joinRoom(
      roomId.toUpperCase(),
      req.user._id.toString()
    );

    res.status(200).json({
      success: true,
      message: "Joined room successfully.",
      room,
    });
  }
);

/**
 * Get Room
 * GET /api/rooms/:roomId
 */
export const getRoom = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const room = await roomService.getRoom(
      req.params.roomId.toUpperCase()
    );

    res.status(200).json({
      success: true,
      room,
    });
  }
);