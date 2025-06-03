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

// Tempo de expiração do token
const TOKEN_EXPIRES_IN = "7d";

// Gera o JWT a partir de um userId
function signToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

/**
 * Cria um novo usuário e retorna um JWT.
 * @throws se campos estiverem faltando ou e-mail já existir
 */
// Gera token de confirmação e expira em X horas
function generateEmailToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");
  // Expira em 24 horas:
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return { rawToken, expires };
}

export async function signup(input: {
  name?: string;
  email?: string;
  password?: string;
}): Promise<{ userId: number; rawToken: string }> {
  const { name, email, password } = input;
  if (!name || !email || !password) {
    throw new AppError(400, "MISSING_FIELDS", "Missing fields");
  }

  // Verifica se já existe usuário com o e-mail
  const exists = await db.user.findUnique({ where: { email } });
  if (exists) {
    throw new AppError(409, "USER_ALREADY_EXISTS", "User already exists");
  }

  // Cria o hash da senha
  const hash = await bcrypt.hash(password, 10);
  const { rawToken, expires } = generateEmailToken();

  // Cria usuário com campos de verificação de e-mail populados:
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hash,
      emailVerified: false, // ainda não confirmado
      emailVerificationToken: rawToken,
      emailVerificationTokenExpires: expires,
    },
  });

  return { userId: user.id, rawToken };
}

/**
 * Autentica um usuário existente e retorna um JWT.
 * @throws se credenciais forem inválidas
 */
export async function login(input: LoginInput): Promise<string> {
  const { email, password } = input;
  if (!email || !password) {
    throw new Error("Missing fields");
  }
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }
  return signToken(user.id);
}
