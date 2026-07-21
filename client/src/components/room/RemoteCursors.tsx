import { useEffect, useState } from "react";
import socket from "../../services/socket";

interface Cursor {
  socketId: string;
  cursor: {
    x: number;
    y: number;
  };
}

const RemoteCursors = () => {
  const [cursors, setCursors] = useState<Cursor[]>([]);

  useEffect(() => {
    socket.on("cursor-move", (data: Cursor) => {
      setCursors((prev) => {
        const filtered = prev.filter(
          (c) => c.socketId !== data.socketId
        );

        return [...filtered, data];
      });
    });

    return () => {
      socket.off("cursor-move");
    };
  }, []);

  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.socketId}
          className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-red-500"
          style={{
            left: cursor.cursor.x,
            top: cursor.cursor.y,
          }}
        />
      ))}
    </>
  );
};

export default RemoteCursors;