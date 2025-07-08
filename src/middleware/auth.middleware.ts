// src/middleware/auth.middleware.ts
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../shared/errors";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      role: string;
      email: string;
      hasPassword: boolean;
    };
  }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError(401, "MISSING_TOKEN", "Missing authentication token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      role: string;
      email: string;
      hasPassword: boolean;
      iat?: number;
      exp?: number;
    };

    // Verificar expiração
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new AppError(401, "TOKEN_EXPIRED", "Token expired");
    }

    req.user = {
      id: payload.userId,
      role: payload.role,
      email: payload.email,
      hasPassword: payload.hasPassword,
    };

    next();
  } catch {
    throw new AppError(401, "INVALID_TOKEN", "Invalid token");
  }
};
