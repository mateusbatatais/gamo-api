// src/routes/auth.ts
import { Router } from "express";
import {
  signup,
  login,
  socialLogin,
  verifyEmail,
} from "../controllers/authController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email", verifyEmail); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post("/social/google", firebaseAuthMiddleware, socialLogin);

export default router;
