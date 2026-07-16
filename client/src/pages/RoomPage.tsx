import { useState } from "react";

const RoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111827",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "30px",
          borderRadius: "12px",
          background: "#1F2937",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          🚀 SyncSpace
        </h1>

        <h3>Create Room</h3>

        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            cursor: "pointer",
            marginBottom: "30px",
          }}
        >
          Create Room
        </button>

        <h3>Join Room</h3>

        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomPage;