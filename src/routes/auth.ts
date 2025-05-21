// src/routes/auth.ts
import { Router, Request, Response, NextFunction } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

interface JwtPayload {
  userId: number;
}

// POST /api/auth/signup
router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing fields" });
      }
      const exists = await db.user.findUnique({ where: { email } });
      if (exists) {
        return res.status(409).json({ error: "User already exists" });
      }
      const hash = await bcrypt.hash(password, 10);
      const user = await db.user.create({
        data: { name, email, password: hash },
      });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      return res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  })();
});

// POST /api/auth/login
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Missing fields" });
      }
      const user = await db.user.findUnique({ where: { email } });
      if (!user || !user.password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      return res.json({ token });
    } catch (err) {
      next(err);
    }
  })();
});

export default router;
