import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import {
  signupSchema,
  loginSchema,
  resendVerificationSchema,
  recoverPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "./auth.schema";
import { AppError } from "../../shared/errors";
import { sendRecoveryEmail, sendVerificationEmail } from "../../infra/email";
import { validate, validateQuery } from "../../middleware/validate.middleware.ts";

export const signup = [
  validate(signupSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, rawToken } = await authService.signup(req.body);
      await sendVerificationEmail(req.body.email, rawToken);

      res.status(201).json({
        code: "USER_CREATED",
        message: "User created. Please verify your email.",
        userId,
      });
    } catch (error: unknown) {
      console.error("Erro no cadastro:", error);
      next(error);

      // Log detalhado do erro de e-mail
      if (typeof error === "object" && error !== null && "response" in error) {
        if (typeof error === "object" && error !== null && "response" in error) {
          console.error("Resposta SMTP:", (error as { response?: unknown }).response);
        }
      }

      throw new Error("INTERNAL_SERVER_ERROR");
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

export const socialLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

      // Chamar o service em vez do repository diretamente
      await authService.verifyEmail(token);

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
