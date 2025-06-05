// src/routes/userConsoles.ts
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  listUserConsoles,
  addUserConsole,
} from "../services/userConsoleService";
import { createUserConsoleSchema } from "../validators/userConsole";

const router = Router();

// GET /api/user/consoles
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (req as any).user.id;
  const consoles = await listUserConsoles(userId);
  res.json(consoles);
});

// POST /api/user/consoles
router.post(
  "/",
  authMiddleware,
  validate(createUserConsoleSchema),
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (req as any).user.id;
    const data = req.body;
    const record = await addUserConsole(userId, data);
    res.status(201).json(record);
  },
);

export default router;
