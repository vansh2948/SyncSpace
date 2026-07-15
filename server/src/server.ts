import http from "http";

import app from "./app";
import env from "./config/env";
import connectDatabase from "./config/db";
import { initializeSocket } from "./socket";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    // Create HTTP Server
    const server = http.createServer(app);

    // Initialize Socket.io
    initializeSocket(server);

    server.listen(env.PORT, () => {
      console.log("==================================");
      console.log("🚀 SyncSpace Backend Started");
      console.log(`🌐 Server: http://localhost:${env.PORT}`);
      console.log(`📦 Environment: ${env.NODE_ENV}`);
      console.log("==================================");
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);

    process.exit(1);
  }
};

startServer();