// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { db } from "../lib/db";
import jwt from "jsonwebtoken";

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = await authService.signup(req.body);
    res.status(201).json({ token });
    // <-- sem return
  } catch (err: any) {
    if (err.message === "User already exists") {
      res.status(409).json({ error: err.message });
      return;
    }
    if (err.message === "Missing fields") {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
    // <-- sem return
  } catch (err: any) {
    if (err.message === "Invalid credentials") {
      res.status(401).json({ error: err.message });
      return;
    }
    if (err.message === "Missing fields") {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  }
}

export async function socialLogin(req: Request, res: Response, next: NextFunction) {
  try {
    // O middleware firebaseAuthMiddleware já colocou o decoded token aqui
    const firebaseUser = (req as any).firebaseUser;
    const { uid, email, name, picture } = firebaseUser;

    // Upsert do usuário no seu banco
    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        name: name || email.split("@")[0],
        email,
        password: null,         // senha não usada
        role: "NORMAL",
        // você pode salvar também firebaseUid: uid em um campo extra
      }
    });

    // Emita seu próprio JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
}