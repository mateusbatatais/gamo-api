// src/routes/userProfile.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  getProfileController,
  updateProfileController,
  changePasswordController,
} from "../controllers/userController";

const router = Router();

// GET /api/user/profile
router.get("/profile", authMiddleware, getProfileController);

// PUT /api/user/profile
router.put("/profile", authMiddleware, updateProfileController);

// PUT /api/user/profile/password
router.put("/profile/password", authMiddleware, changePasswordController);

export default router;
