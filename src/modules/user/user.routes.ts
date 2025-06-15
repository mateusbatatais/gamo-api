import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { getProfile, updateProfile, changePassword } from "./user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile/password", authMiddleware, changePassword);

export default router;
