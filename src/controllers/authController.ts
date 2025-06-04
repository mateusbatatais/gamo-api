// src/controllers/authController.ts

import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { sendVerificationEmail } from "../utils/email";
import { AppError } from "../utils/errors";
import { db } from "../lib/db";
import jwt from "jsonwebtoken";

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
    // 1) Log para confirmar que o signup foi chamado e ver o body que veio
    console.log(
      "🔔 [SIGNUP] Requisição recebida em /signup com body:",
      req.body
    );

    // 2) Chama o serviço que cria o usuário e retorna { userId, rawToken }
    const { userId, rawToken } = await authService.signup(req.body);

    // 3) Envia o e-mail de verificação
    await sendVerificationEmail(req.body.email as string, rawToken);

    // 4) Retorna sucesso ao cliente
    res.status(201).json({
      code: "USER_CREATED",
      message: "User created. Please check your email to verify your account.",
      userId,
    });
  } catch (err: any) {
    // Se for um AppError (erro intencional lançado pelo serviço), devolve o código e mensagem
    if (err instanceof AppError) {
      console.error("❌ [SIGNUP] AppError:", err.code, err.message);
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    // Para qualquer outro erro inesperado, log completo e delega ao middleware global
    console.error("❌ [SIGNUP] Erro inesperado:", err);
    next(err);
  }
}
