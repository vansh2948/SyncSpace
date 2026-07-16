import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import Room from "../models/room.model";
import asyncHandler from "../utils/asyncHandler";

export const createRoom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { roomName } = req.body;

    if (!roomName) {
      res.status(400).json({
        success: false,
        message: "Room name is required.",
      });
      return;
    }

    const roomId = uuidv4().replace(/-/g, "").substring(0, 6).toUpperCase();

    const userId = (req as any).user._id;

    const room = await Room.create({
      roomId,
      roomName,
      createdBy: userId,
      members: [userId],
    });

    res.status(201).json({
      success: true,
      message: "Room created successfully.",
      room,
    });
  }
);