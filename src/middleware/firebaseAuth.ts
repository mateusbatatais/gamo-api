// src/middleware/firebaseAuth.ts
import { RequestHandler } from "express";
import { firebaseAuth } from "../utils/firebase";

export const firebaseAuthMiddleware: RequestHandler = async (
  req,
  res,
  next,
) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "ID token não fornecido" });
    return; // apenas retorno vazio
  }

  const idToken = header.split(" ")[1];
  try {
    const decoded = await firebaseAuth.verifyIdToken(idToken);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).firebaseUser = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token Firebase inválido" });
    return;
  }
};
