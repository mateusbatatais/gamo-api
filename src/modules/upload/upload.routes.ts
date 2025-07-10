import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { uploadProfileImage, uploadCollectionImage } from "./upload.controller";

const router = Router();

router.post("/profile", authMiddleware, ...uploadProfileImage);
router.post("/collection", authMiddleware, ...uploadCollectionImage);

export default router;
