import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { db } from "../core/db";
import jwt from "jsonwebtoken";
import { sendVerificationEmail, sendRecoveryEmail } from "../infra/email";
import { AppError } from "../shared/errors";
import { DecodedIdToken } from "firebase-admin/auth";

/**
 * POST /api/auth/signup
 * Cria usuário, envia e-mail de verificação e retorna JSON de sucesso.
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("🔔 [SIGNUP] Requisição recebida em /signup com body:", req.body);

    const { userId, rawToken } = await authService.signup(req.body);
    await sendVerificationEmail(req.body.email as string, rawToken);

    res.status(201).json({
      code: "USER_CREATED",
      message: "User created. Please check your email to verify your account.",
      userId,
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      console.error("❌ [SIGNUP] AppError:", err.code, err.message);
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    console.error("❌ [SIGNUP] Erro inesperado:", err);
    next(err);
  }
}

/**
 * POST /api/auth/login
 * Autentica usuário e retorna { token }, ou erro se inválido/sem verificação.
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
    return;
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
}

/**
 * POST /api/auth/social-login
 * (exemplo para login via Firebase)
 */
export async function socialLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Fazemos cast interno para recuperar `firebaseUser`
    interface RequestWithFirebaseUser extends Request {
      firebaseUser: DecodedIdToken;
    }
    const typedReq = req as RequestWithFirebaseUser;

    // Pega dados do Firebase (injetado pelo middleware)
    const firebaseUser = typedReq.firebaseUser;
    const { email, name } = firebaseUser;

    if (!email) {
      res
        .status(400)
        .json({ code: "NO_EMAIL_IN_TOKEN", message: "Email não encontrado no token do Firebase" });
      return;
    }

    // Upsert no banco
    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        name: name || email.split("@")[0],
        email,
        password: null,
        role: "NORMAL",
        emailVerified: true, // para social-login, já é verificado
      },
    });

    // Gera JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/verify-email?token=XYZ
 * Valida token enviado no e-mail e marca emailVerified = true.
 */
export async function verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { token } = req.query as { token?: string };
    if (!token) {
      res.status(400).json({ code: "NO_TOKEN_PROVIDED", message: "No token provided" });
      return;
    }

    const user = await db.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpires: { gt: new Date() },
      },
    });

    if (!user) {
      res.status(400).json({
        code: "INVALID_OR_EXPIRED_TOKEN",
        message: "Invalid or expired token",
      });
      return;
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpires: null,
      },
    });

    res.json({
      code: "EMAIL_CONFIRMED",
      message: "Email successfully confirmed",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/resend-verification
 * Reenvia token de verificação de e-mail para o usuário.
 */
export async function resendVerification(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, locale } = req.body as { email?: string; locale?: string };
    if (!email) {
      res.status(400).json({ code: "MISSING_FIELDS", message: "Email is required" });
      return;
    }
    const { rawToken } = await authService.resendVerificationToken({ email });
    await sendVerificationEmail(email, rawToken, locale);

    res.json({
      code: "RESEND_SUCCESS",
      message: "Verification email sent again.",
    });
    return;
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
}

/**
 * POST /api/auth/recover
 * Recebe { email }, gera token de recuperação e envia e-mail com link.
 */
export async function recoverPassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, locale } = req.body as { email?: string; locale?: string };
    if (!email) {
      res.status(400).json({ code: "MISSING_FIELDS", message: "Email is required" });
      return;
    }

    // Gera token de recuperação
    const { rawToken } = await authService.createPasswordResetToken({ email });

    // Monta a URL que o usuário clicará para redefinir a senha
    const frontendUrl = process.env.FRONTEND_URL!; // ex: "https://gamo.games"
    const resetLink = `${frontendUrl}/reset-password?token=${rawToken}`;

    // Envia o e-mail de recuperação
    await sendRecoveryEmail(email, resetLink, locale);

    res.json({
      code: "RECOVERY_EMAIL_SENT",
      message: "Recovery email sent.",
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
}

/**
 * POST /api/auth/reset-password
 * Recebe { token, newPassword }, valida e redefine a senha.
 */
export async function resetPasswordController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword({ token, newPassword });
    res.json({
      code: "PASSWORD_RESET_SUCCESS",
      message: "Password reset successfully.",
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
}
