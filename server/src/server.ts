import http from "http";
import app from "./app";
import env from "./config/env";
import connectDatabase from "./config/db";

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Create HTTP Server
    const server = http.createServer(app);

    // Start Server
    server.listen(env.PORT, () => {
      console.log("==================================");
      console.log("🚀 SyncSpace Backend Started");
      console.log(`🌐 Server: http://localhost:${env.PORT}`);
      console.log(`📦 Environment: ${env.NODE_ENV}`);
      console.log("==================================");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();