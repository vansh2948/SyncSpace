import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("==================================");
  console.error("ERROR:", err.message);
  console.error(err.stack);
  console.error("==================================");

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
};

export default errorHandler;