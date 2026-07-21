import { Stage, Layer, Line } from "react-konva";
import { useEffect, useRef, useState } from "react";

import socket from "../../services/socket";

interface LineData {
  points: number[];
}

interface Props {
  roomId: string;
}

const Whiteboard = ({ roomId }: Props) => {
  const stageRef = useRef<any>(null);

  const [lines, setLines] = useState<LineData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    socket.on("initial-room-state", ({ whiteboard }) => {
      if (whiteboard) {
        setLines(whiteboard);
      }
    });

    socket.on("drawing", (remoteLines: LineData[]) => {
      setLines(remoteLines);
    });

    return () => {
      socket.off("initial-room-state");
      socket.off("drawing");
    };
  }, []);

  const handleMouseDown = () => {
    const stage = stageRef.current;

    const point = stage.getPointerPosition();

    if (!point) return;

    setIsDrawing(true);

    setLines((prev) => [
      ...prev,
      {
        points: [point.x, point.y],
      },
    ]);
  };

  const handleMouseMove = () => {
    if (!isDrawing) return;

    const stage = stageRef.current;

    const point = stage.getPointerPosition();

    if (!point) return;

    setLines((prev) => {
      const updated = [...prev];

      const last = updated[updated.length - 1];

      last.points = [...last.points, point.x, point.y];

      socket.emit("drawing", {
        roomId,
        drawing: updated,
      });

      return updated;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    socket.emit("drawing", {
      roomId,
      drawing: lines,
    });
  };

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth * 0.4}
      height={window.innerHeight - 80}
      className="bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {lines.map((line, index) => (
          <Line
            key={index}
            points={line.points}
            stroke="#0ea5e9"
            strokeWidth={3}
            lineCap="round"
            lineJoin="round"
            tension={0.5}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Whiteboard;