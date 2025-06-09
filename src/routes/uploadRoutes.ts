// src/routes/uploadRoutes.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { uploadProfileImage } from "../controllers/uploadController";

const router = Router();

// POST /api/uploads/profile
router.post("/profile", authMiddleware, ...uploadProfileImage);

export default router;
