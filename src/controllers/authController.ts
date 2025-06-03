// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { db } from "../lib/db";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email";
import { AppError } from "../utils/errors";

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 1) Cria usuário e recebe { userId, rawToken }
    const { userId, rawToken } = await authService.signup(req.body);

    // 2) Envia e-mail de verificação usando o token gerado
    //    O front-end deve processar link: /verify-email?token=<rawToken>
    await sendVerificationEmail(req.body.email as string, rawToken);

    // 3) Responde sucesso para o cliente, sem retornar JWT
    res.status(201).json({
      code: "USER_CREATED",
      message: "User created. Please check your email to verify your account.",
      userId,
    });
    return;
  } catch (err: any) {
    // Se for AppError (lançado no serviço), devolve JSON estruturado
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    // Qualquer outro erro cai no middleware global
    next(err);
  }
}

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
    if (err.message === "Invalid credentials") {
      res
        .status(401)
        .json({ code: "INVALID_CREDENTIALS", message: err.message });
      return;
    }
    if (err.message === "Missing fields") {
      res.status(400).json({ code: "MISSING_FIELDS", message: err.message });
      return;
    }
    next(err);
  }
}

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

    // Busca usuário que tenha aquele token e cujo token ainda não expirou
    const user = await db.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpires: { gt: new Date() }, // só aceita se expirarData > agora
      },
    });

    if (!user) {
      res.status(400).json({
        code: "INVALID_OR_EXPIRED_TOKEN",
        message: "Invalid or expired token",
      });
      return;
    }

    // Atualiza o usuário para marcar e-mail como verificado
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
