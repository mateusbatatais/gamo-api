import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { sendVerificationEmail, sendRecoveryEmail } from "@infra/email";
import {
  signupSchema,
  loginSchema,
  resendVerificationSchema,
  recoverPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "./auth.schema";
import { validate, validateQuery } from "../../middleware/validate.middleware.ts";
import { db } from "../../core/db";
import { AppError } from "@shared/errors";

export const signup = [
  validate(signupSchema), // Middleware de validação
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Signup Body:", req.body); // Log para depuração

      const { userId, rawToken } = await authService.signup(req.body);
      await sendVerificationEmail(req.body.email, rawToken);

      res.status(201).json({
        code: "USER_CREATED",
        message: "User created. Please verify your email.",
        userId,
      });
    } catch (err) {
      next(err);
    }
  },
];
export const login = [
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await authService.login(req.body);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  },
];

// auth.controller.ts
export const socialLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Agora TypeScript reconhece req.firebaseUser
    if (!req.firebaseUser || !req.firebaseUser.email) {
      throw new AppError(400, "INVALID_TOKEN", "Token inválido ou sem email");
    }

    const name = req.firebaseUser.name || req.firebaseUser.email.split("@")[0];
    const token = await authService.socialLogin(req.firebaseUser.email, name);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = [
  validateQuery(verifyEmailSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.query as { token: string };

      const user = await db.user.findFirst({
        where: {
          emailVerificationToken: token,
          emailVerificationTokenExpires: { gt: new Date() },
        },
      });

      if (!user) {
        throw new AppError(400, "INVALID_OR_EXPIRED_TOKEN", "Invalid or expired token");
      }

      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          emailVerificationToken: null,
          emailVerificationTokenExpires: null,
        },
      });

      res.json({ code: "EMAIL_CONFIRMED", message: "Email successfully confirmed" });
    } catch (err) {
      next(err);
    }
  },
];

export const resendVerification = [
  validate(resendVerificationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, locale } = req.body;
      const { rawToken } = await authService.resendVerificationToken({ email });
      await sendVerificationEmail(email, rawToken, locale);
      res.json({ code: "RESEND_SUCCESS", message: "Verification email sent again." });
    } catch (err) {
      next(err);
    }
  },
];

export const recoverPassword = [
  validate(recoverPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, locale } = req.body;
      const { rawToken } = await authService.createPasswordResetToken({ email });
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
      await sendRecoveryEmail(email, resetLink, locale);
      res.json({ code: "RECOVERY_EMAIL_SENT", message: "Recovery email sent." });
    } catch (err) {
      next(err);
    }
  },
];

export const resetPassword = [
  validate(resetPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.resetPassword(req.body);
      res.json({ code: "PASSWORD_RESET_SUCCESS", message: "Password reset successfully." });
    } catch (err) {
      next(err);
    }
  },
];
