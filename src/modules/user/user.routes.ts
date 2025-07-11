import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { getProfile, updateProfile, changePassword, setInitialPassword } from "./user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile/password", authMiddleware, changePassword);
router.put("/profile/initial-password", authMiddleware, setInitialPassword);

export default router;
