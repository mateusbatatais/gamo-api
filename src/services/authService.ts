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

export interface RecoverInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

// Tempo de expiração do JWT
const TOKEN_EXPIRES_IN = "7d";

// Gera o JWT a partir de um userId
function signToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

// Gera um token aleatório com data de expiração em milissegundos
function generateTokenWithExpiry(expireMs: number): { rawToken: string; expires: Date } {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + expireMs);
  return { rawToken, expires };
}

/**
 * Cria um novo usuário e retorna { userId, rawToken } para verificação de e-mail.
 * @throws AppError(400, "MISSING_FIELDS", ...)  se faltar algum campo
 * @throws AppError(409, "USER_ALREADY_EXISTS", ...) se o e-mail já existir
 */
export async function signup(input: SignupInput): Promise<{ userId: number; rawToken: string }> {
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
  const { rawToken, expires } = generateTokenWithExpiry(24 * 60 * 60 * 1000); // 24h

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

/**
 * (Re)gera um token de verificação para o e-mail informado e atualiza o usuário.
 * @throws AppError(400, "MISSING_FIELDS", ...)   se não fornecer email
 * @throws AppError(404, "USER_NOT_FOUND", ...)    se não encontrar usuário
 * @throws AppError(400, "ALREADY_VERIFIED", ...)  se o e-mail já estiver verificado
 */
export async function resendVerificationToken({
  email,
}: {
  email: string;
}): Promise<{ rawToken: string }> {
  if (!email) {
    throw new AppError(400, "MISSING_FIELDS", "Email is required");
  }

  // Tenta encontrar o usuário pelo e-mail
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "User not found");
  }

  // Se já estiver verificado, não faz sentido reenviar token
  if (user.emailVerified) {
    throw new AppError(400, "ALREADY_VERIFIED", "Email already verified");
  }

  // Gera novo token e expiração
  const { rawToken, expires } = generateTokenWithExpiry(24 * 60 * 60 * 1000); // 24h

  // Atualiza no banco
  await db.user.update({
    where: { email },
    data: {
      emailVerificationToken: rawToken,
      emailVerificationTokenExpires: expires,
    },
  });

  return { rawToken };
}

/**
 * Gera um token de recuperação de senha e salva no BD.
 * @throws AppError(404, "USER_NOT_FOUND", ...) se usuário não existir
 * @throws AppError(400, "EMAIL_NOT_VERIFIED", ...) se e-mail não estiver confirmado
 */
export async function createPasswordResetToken({
  email,
}: RecoverInput): Promise<{ rawToken: string }> {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "User not found");
  }
  if (!user.emailVerified) {
    // Se quiser permitir recuperar antes de confirmar e-mail, remova este bloco
    throw new AppError(400, "EMAIL_NOT_VERIFIED", "Email not verified");
  }

  // Token válido por 1 hora (60min * 60s * 1000ms)
  const { rawToken, expires } = generateTokenWithExpiry(60 * 60 * 1000);

  await db.user.update({
    where: { email },
    data: {
      passwordResetToken: rawToken,
      passwordResetTokenExpires: expires,
    },
  });

  return { rawToken };
}

/**
 * Redefine password a partir do token válido.
 * @throws AppError(400, "MISSING_FIELDS", ...) se faltar token ou newPassword
 * @throws AppError(400, "INVALID_OR_EXPIRED_TOKEN", ...) se token inválido ou expirado
 */
export async function resetPassword({ token, newPassword }: ResetPasswordInput): Promise<void> {
  if (!token || !newPassword) {
    throw new AppError(400, "MISSING_FIELDS", "Missing token or new password");
  }

  // Encontra usuário com este token válido (não expirado)
  const user = await db.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpires: { gt: new Date() },
    },
  });
  if (!user) {
    throw new AppError(400, "INVALID_OR_EXPIRED_TOKEN", "Invalid or expired token");
  }

  // Faz hash da nova senha
  const hash = await bcrypt.hash(newPassword, 10);

  // Atualiza no BD: nova senha + limpa token
  await db.user.update({
    where: { id: user.id },
    data: {
      password: hash,
      passwordResetToken: null,
      passwordResetTokenExpires: null,
    },
  });
}
