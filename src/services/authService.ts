// src/services/authService.ts

import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AppError } from "../utils/errors";

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// Tempo de expiração do JWT
const TOKEN_EXPIRES_IN = "7d";

// Gera o JWT a partir de um userId
function signToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

// Gera um token de verificação de e-mail e a data de expiração (24h)
function generateEmailToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  return { rawToken, expires };
}

/**
 * Cria um novo usuário e retorna { userId, rawToken } para verificação de e-mail.
 * Em vez de retornar JWT, gera token de confirmação e salva no banco.
 * @throws AppError(400, "MISSING_FIELDS", ...)  se faltar algum campo
 * @throws AppError(409, "USER_ALREADY_EXISTS", ...) se o e-mail já existir
 */
export async function signup(
  input: SignupInput
): Promise<{ userId: number; rawToken: string }> {
  const { name, email, password } = input;
  if (!name || !email || !password) {
    throw new AppError(400, "MISSING_FIELDS", "Missing fields");
  }

  // Verifica se já existe usuário com o e-mail
  const exists = await db.user.findUnique({ where: { email } });
  if (exists) {
    throw new AppError(409, "USER_ALREADY_EXISTS", "User already exists");
  }

  // Hash da senha
  const hash = await bcrypt.hash(password, 10);
  const { rawToken, expires } = generateEmailToken();

  // Cria usuário com campos de verificação de e-mail
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hash,
      emailVerified: false,
      emailVerificationToken: rawToken,
      emailVerificationTokenExpires: expires,
    },
  });

  return { userId: user.id, rawToken };
}

/**
 * Autentica um usuário existente e retorna um JWT.
 * Verifica se e-mail já foi confirmado.
 * @throws AppError(400, "MISSING_FIELDS", ...)
 * @throws AppError(401, "INVALID_CREDENTIALS", ...)
 * @throws AppError(403, "EMAIL_NOT_VERIFIED", ...)
 */
export async function login(input: LoginInput): Promise<string> {
  const { email, password } = input;
  if (!email || !password) {
    throw new AppError(400, "MISSING_FIELDS", "Missing fields");
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  // Verifica se o e-mail do usuário já foi confirmado
  if (!user.emailVerified) {
    throw new AppError(403, "EMAIL_NOT_VERIFIED", "Email not verified");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  return signToken(user.id);
}
