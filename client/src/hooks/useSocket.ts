import { useEffect } from "react";
import socket from "../services/socket";

const useSocket = (roomId: string) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-room", roomId);

    const reconnectHandler = () => {
      socket.emit("join-room", roomId);
    };

    socket.on("connect", reconnectHandler);

    return () => {
      socket.emit("leave-room", roomId);

      socket.off("connect", reconnectHandler);
    };
  }, [roomId]);
};

export default useSocket;