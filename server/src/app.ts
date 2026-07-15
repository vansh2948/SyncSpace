import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    project: "SyncSpace",
    message: "Welcome to SyncSpace Backend 🚀",
    version: "1.0.0",
  });
});

export default app;