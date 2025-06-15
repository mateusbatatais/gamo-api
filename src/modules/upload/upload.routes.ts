import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { uploadProfileImage } from "./upload.controller";

const router = Router();

router.post("/profile", authMiddleware, ...uploadProfileImage);

export default router;
