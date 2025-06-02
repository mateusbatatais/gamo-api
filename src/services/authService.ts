// src/services/authService.ts

import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
export async function signup(input: SignupInput): Promise<string> {
  const { name, email, password } = input;
  if (!name || !email || !password) {
    throw new Error("Missing fields");
  }
  const exists = await db.user.findUnique({ where: { email } });
  if (exists) {
    throw new Error("User already exists");
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { name, email, password: hash },
  });
  return signToken(user.id);
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
