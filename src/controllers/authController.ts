// src/controllers/authController.ts

import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { db } from "../lib/db";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email";
import { AppError } from "../utils/errors";

/**
 * POST /api/auth/signup
 * Cria usuário, envia e-mail de verificação e retorna JSON de sucesso.
 */
export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Cria usuário e recebe { userId, rawToken }
    const { userId, rawToken } = await authService.signup(req.body);

    // Envia e-mail de verificação
    await sendVerificationEmail(req.body.email as string, rawToken);

    // Retorna sucesso (sem JWT). Front exibirá mensagem “verifique seu e-mail”.
    res.status(201).json({
      code: "USER_CREATED",
      message: "User created. Please check your email to verify your account.",
      userId,
    });
    return;
  } catch (err: any) {
    if (err instanceof AppError) {
      // Responde com status e código/message do AppError
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    // Qualquer outro erro: delega para middleware global
    next(err);
  }
}

/**
 * POST /api/auth/login
 * Autentica usuário e retorna { token }, ou erro se inválido/sem verificação.
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
    return;
  } catch (err: any) {
    if (err instanceof AppError) {
      // Caso seja AppError, devolve status e JSON próprio
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    // Qualquer outro erro inesperado:
    next(err);
  }
}

/**
 * POST /api/auth/social-login
 * (exemplo para login via Firebase)
 */
export async function socialLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const firebaseUser = (req as any).firebaseUser;
    const { uid, email, name, picture } = firebaseUser;

    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        name: name || email.split("@")[0],
        email,
        password: null,
        role: "NORMAL",
        emailVerified: true, // para social-login, marcamos como verificado
      },
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
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
export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { token } = req.query as { token?: string };
    if (!token) {
      res
        .status(400)
        .json({ code: "NO_TOKEN_PROVIDED", message: "No token provided" });
      return;
    }

    // Procura usuário com token válido e não expirado
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

    // Marca e-mail como verificado e limpa campos de token
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
