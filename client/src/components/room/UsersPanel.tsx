import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import socket from "../../services/socket";

const UsersPanel = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const handleUserJoined = ({ socketId }: { socketId: string }) => {
      setUsers((prev) =>
        prev.includes(socketId) ? prev : [...prev, socketId]
      );
    };

    const handleUserLeft = ({ socketId }: { socketId: string }) => {
      setUsers((prev) => prev.filter((id) => id !== socketId));
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("user-left", handleUserLeft);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("user-left", handleUserLeft);
    };
  }, []);

  return (
    <div className="w-72 border-l border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-white/10 p-5">
        <Users className="text-cyan-400" />
        <h2 className="text-lg font-semibold text-white">
          Participants
        </h2>
      </div>

      <div className="space-y-3 p-5">
        {users.length === 0 ? (
          <p className="text-sm text-slate-400">
            No other users connected.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user}
              className="rounded-xl bg-white/5 p-3 text-sm text-white"
            >
              {user}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPanel;