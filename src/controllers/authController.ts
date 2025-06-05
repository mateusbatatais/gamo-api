// src/controllers/authController.ts

import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { db } from "../lib/db";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email";
import { AppError } from "../utils/errors";
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
 *
 * Note que aqui alteramos para receber `req: Request` genérico e
 * somente dentro do corpo fazemos o cast para `RequestWithFirebaseUser`.
 */
export async function socialLogin(req: Request, res: Response, next: NextFunction) {
  try {
    // 1) Fazemos o cast interno para recuperar `firebaseUser`
    interface RequestWithFirebaseUser extends Request {
      firebaseUser: DecodedIdToken;
    }
    const typedReq = req as RequestWithFirebaseUser;

    // 2) Pega os dados do usuário já “injetados” pelo middleware
    const firebaseUser = typedReq.firebaseUser;
    const { email, name } = firebaseUser;

    if (!email) {
      res
        .status(400)
        .json({ code: "NO_EMAIL_IN_TOKEN", message: "Email não encontrado no token do Firebase" });
      return;
    }

    // 3) Upserta (inserir ou atualizar) o usuário no banco
    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        name: name || email.split("@")[0],
        email,
        password: null,
        role: "NORMAL",
        emailVerified: true, // para social-login, já consideramos verificado
      },
    });

    // 4) Gera JWT baseado no usuário criado/recuperado
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

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

export async function resendVerification(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ code: "MISSING_FIELDS", message: "Email is required" });
      return;
    }

    const { rawToken } = await authService.resendVerificationToken({ email });
    await sendVerificationEmail(email, rawToken);

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
