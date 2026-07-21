import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

socket.on("connect", () => {
  console.log("🟢 Socket Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Socket Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("Socket Error:", error.message);
});

socket.on("reconnect", (attempt) => {
  console.log(`🟢 Reconnected after ${attempt} attempts`);
});

export default socket;