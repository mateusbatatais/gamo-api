// src/middleware/firebaseAuth.ts
import { Request, RequestHandler } from "express";

// 1) Declaramos aqui a interface que “estende” Request com nosso campo extra:
import { DecodedIdToken } from "firebase-admin/auth";
import { firebaseAuth } from "../infra/firebase";

interface RequestWithFirebaseUser extends Request {
  firebaseUser: DecodedIdToken;
}

// 2) Mantemos a assinatura como RequestHandler para que o Express reconheça sem problemas:
export const firebaseAuthMiddleware: RequestHandler = async (req, res, next) => {
  // 3) Fazemos o “cast” para a interface que tem firebaseUser:
  const typedReq = req as RequestWithFirebaseUser;

  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "ID token não fornecido" });
    return;
  }

  const idToken = header.split(" ")[1];
  try {
    // 4) Verifica o token no Firebase e atribui decoded em typedReq.firebaseUser
    const decoded = await firebaseAuth.verifyIdToken(idToken);
    typedReq.firebaseUser = decoded;
    return next();
  } catch {
    res.status(401).json({ error: "Token Firebase inválido" });
    return;
  }
};
