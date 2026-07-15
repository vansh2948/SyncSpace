import jwt from "jsonwebtoken";
import env from "../config/env";

/**
 * Generate JWT Token
 */
const generateToken = (userId: string): string => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      id: userId,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );
};

export default generateToken;