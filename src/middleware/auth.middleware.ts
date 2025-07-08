import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../shared/errors";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      name: string;
      slug: string;
      email: string;
      profileImage: string | null;
      role: string;
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
      name: string;
      slug: string;
      email: string;
      profileImage: string | null;
      role: string;
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
      name: payload.name,
      slug: payload.slug,
      email: payload.email,
      profileImage: payload.profileImage,
      role: payload.role,
      hasPassword: payload.hasPassword,
    };

    next();
  } catch {
    throw new AppError(401, "INVALID_TOKEN", "Invalid token");
  }
};
