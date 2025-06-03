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
    return;
  } catch (err: any) {
    if (err.message === "User already exists") {
      res
        .status(409)
        .json({ code: "USER_ALREADY_EXISTS", message: err.message });
      return;
    }
    if (err.message === "Missing fields") {
      res.status(400).json({ code: "MISSING_FIELDS", message: err.message });
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
    return;
  } catch (err: any) {
    if (err.message === "Invalid credentials") {
      res
        .status(401)
        .json({ code: "INVALID_CREDENTIALS", message: err.message });
      return;
    }
    if (err.message === "Missing fields") {
      res.status(400).json({ code: "MISSING_FIELDS", message: err.message });
      return;
    }
    next(err);
  }
}

export async function socialLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const firebaseUser = (req as any).firebaseUser;
    const { uid, email, name, picture } = firebaseUser;

    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        name: name || email.split("@")[0],
        email,
        password: null,
        role: "NORMAL",
      },
    });

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
