import express from "express";
import cors from "cors";

import router from "./routes";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";

const app = express();

// ===========================
// Global Middlewares
// ===========================

app.use(cors());

app.use(express.json());

// ===========================
// Routes
// ===========================

app.use("/", router);

// ===========================
// 404 Middleware
// ===========================

app.use(notFound);

// ===========================
// Global Error Handler
// ===========================

app.use(errorHandler);

export default app;