// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

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
