import { useEffect } from "react";
import socket from "./services/socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("welcome", (data) => {
      console.log("🎉", data);
    });

    return () => {
      socket.off("connect");
      socket.off("welcome");
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
      🚀 SyncSpace Frontend Connected
    </div>
  );
}

export default App;