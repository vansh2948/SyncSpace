import { Server, Socket } from "socket.io";
import http from "http";

import { registerRoomEvents } from "./room.socket";

let io: Server;

export const initializeSocket = (server: http.Server): Server => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("🟢 User Connected:", socket.id);

    socket.emit("welcome", {
      message: "Welcome to SyncSpace!",
      socketId: socket.id,
    });

    registerRoomEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);
    });
  });

  console.log("✅ Socket.io Initialized");

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io has not been initialized.");
  }

  return io;
};