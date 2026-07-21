import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";

import roomService from "../services/roomService";

let io: Server;

interface CursorPosition {
  x: number;
  y: number;
}

interface RoomState {
  code: string;
  whiteboard: any[];
}

const roomStates = new Map<string, RoomState>();

export const initializeSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on("join-room", async (roomId: string) => {
      socket.join(roomId);

      let state = roomStates.get(roomId);

      if (!state) {
        const room = await roomService.getRoom(roomId);

        state = {
          code: room.code,
          whiteboard: room.whiteboard,
        };

        roomStates.set(roomId, state);
      }

      socket.emit("initial-room-state", state);

      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
      });
    });

    socket.on(
      "code-change",
      async ({
        roomId,
        code,
      }: {
        roomId: string;
        code: string;
      }) => {
        const state = roomStates.get(roomId);

        if (state) {
          state.code = code;
        }

        await roomService.saveCode(roomId, code);

        socket.to(roomId).emit("code-change", code);
      }
    );

    socket.on(
      "drawing",
      async ({
        roomId,
        drawing,
      }: {
        roomId: string;
        drawing: any[];
      }) => {
        const state = roomStates.get(roomId);

        if (state) {
          state.whiteboard = drawing;
        }

        await roomService.saveWhiteboard(roomId, drawing);

        socket.to(roomId).emit("drawing", drawing);
      }
    );

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

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);

      socket.to(roomId).emit("user-left", {
        socketId: socket.id,
      });

      const room = io.sockets.adapter.rooms.get(roomId);

      if (!room || room.size === 0) {
        roomStates.delete(roomId);
      }
    });

    socket.on("disconnect", (reason) => {
  console.log(
    `Socket Disconnected: ${socket.id} (${reason})`
  );
});
  });
};

export { io };