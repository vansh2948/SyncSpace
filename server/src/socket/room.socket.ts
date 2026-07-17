import { Server, Socket } from "socket.io";

export const registerRoomEvents = (
  io: Server,
  socket: Socket
): void => {
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);

    console.log(`🟢 ${socket.id} joined room ${roomId}`);

    socket.to(roomId).emit("user-joined", {
      socketId: socket.id,
    });
  });

  socket.on("leave-room", (roomId: string) => {
    socket.leave(roomId);

    console.log(`🔴 ${socket.id} left room ${roomId}`);

    socket.to(roomId).emit("user-left", {
      socketId: socket.id,
    });
  });
};