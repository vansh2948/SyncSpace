import { useEffect } from "react";
import socket from "../services/socket";

const useRoomState = (roomId: string) => {
  useEffect(() => {
    socket.emit("join-room", roomId);

    return () => {
      socket.emit("leave-room", roomId);
    };
  }, [roomId]);
};

export default useRoomState;