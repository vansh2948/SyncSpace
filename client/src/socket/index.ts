import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

interface CursorPosition {
  x: number;
  y: number;
}

export const initializeSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);

      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
      });
    });

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);

      socket.to(roomId).emit("user-left", {
        socketId: socket.id,
      });
    });

    socket.on("code-change", ({ roomId, code }) => {
      socket.to(roomId).emit("code-change", code);
    });

    socket.on("drawing", ({ roomId, drawing }) => {
      socket.to(roomId).emit("drawing", drawing);
    });

    socket.on(
      "cursor-move",
      ({
        roomId,
        cursor,
      }: {
        roomId: string;
        cursor: CursorPosition;
      }) => {
        socket.to(roomId).emit("cursor-move", {
          socketId: socket.id,
          cursor,
        });
      }
    );

    socket.on("disconnect", () => {
      console.log(`Socket Disconnected: ${socket.id}`);
    });
  });
};

export { io };