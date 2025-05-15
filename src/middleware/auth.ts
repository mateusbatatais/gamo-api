// src/middleware/auth.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

// Declaramos como RequestHandler (retorna void)
export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token faltando" });
    return; // retorna void, sem devolver o `res`
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = { id: payload.userId };
    next(); // segue adiante
  } catch {
    res.status(401).json({ error: "Token inválido" });
    return;
  }
};
