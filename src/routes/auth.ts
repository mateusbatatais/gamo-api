// src/routes/auth.ts
import { Router } from "express";
import {
  signup,
  login,
  socialLogin,
  verifyEmail,
  resendVerification,
} from "../controllers/authController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/social/google", firebaseAuthMiddleware, socialLogin);
router.post("/resend-verification", resendVerification);

export default router;
