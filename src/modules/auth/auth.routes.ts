// auth.routes.ts
import { Router } from "express";
import {
  signup,
  login,
  socialLogin,
  verifyEmail,
  resendVerification,
  resetPassword,
  recoverPassword,
} from "./auth.controller";
import {
  loginSchema,
  recoverPasswordSchema,
  resendVerificationSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema,
} from "./auth.schema";
import { validate, validateQuery } from "../../middleware/validate.middleware.ts";
import { firebaseAuthMiddleware } from "../../middleware/firebase.middleware";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/verify-email", validateQuery(verifyEmailSchema), verifyEmail);
router.post("/social/google", firebaseAuthMiddleware, socialLogin);
router.post("/resend-verification", validate(resendVerificationSchema), resendVerification);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post("/recover", validate(recoverPasswordSchema), recoverPassword);

export default router;
