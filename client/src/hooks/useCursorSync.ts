import { useEffect } from "react";
import socket from "../services/socket";

const useCursorSync = (roomId: string) => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      socket.emit("cursor-move", {
        roomId,
        cursor: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [roomId]);
};

export default useCursorSync;