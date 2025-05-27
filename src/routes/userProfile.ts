import { Router, Request, Response, NextFunction } from "express";
import { db } from "../lib/db";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET /api/user/profile
router.get(
  "/profile",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true },
      });
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
