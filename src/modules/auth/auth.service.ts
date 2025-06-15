import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  SignupInput,
  LoginInput,
  RecoverPasswordInput,
  ResetPasswordInput,
  ResendVerificationInput,
} from "./auth.schema";
import { db } from "../../core/db";
import { AppError } from "../../shared/errors";

const TOKEN_EXPIRES_IN = "7d";

function signToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: TOKEN_EXPIRES_IN });
}

function generateTokenWithExpiry(expireMs: number) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + expireMs);
  return { rawToken, expires };
}

export const signup = async (input: SignupInput) => {
  const { name, email, password } = input;

  const exists = await db.user.findUnique({ where: { email } });
  if (exists) throw new AppError(409, "USER_ALREADY_EXISTS", "User already exists");

  const hash = await bcrypt.hash(password, 10);
  const { rawToken, expires } = generateTokenWithExpiry(24 * 60 * 60 * 1000);

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
};

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.password)
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  if (!user.emailVerified) throw new AppError(403, "EMAIL_NOT_VERIFIED", "Email not verified");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");

  return signToken(user.id);
};

export const resendVerificationToken = async (input: ResendVerificationInput) => {
  const { email } = input;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new AppError(404, "USER_NOT_FOUND", "User not found");
  if (user.emailVerified) throw new AppError(400, "ALREADY_VERIFIED", "Email already verified");

  const { rawToken, expires } = generateTokenWithExpiry(24 * 60 * 60 * 1000);

  await db.user.update({
    where: { email },
    data: {
      emailVerificationToken: rawToken,
      emailVerificationTokenExpires: expires,
    },
  });

  return { rawToken };
};

export const createPasswordResetToken = async (input: RecoverPasswordInput) => {
  const { email } = input;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new AppError(404, "USER_NOT_FOUND", "User not found");
  if (!user.emailVerified) throw new AppError(400, "EMAIL_NOT_VERIFIED", "Email not verified");

  const { rawToken, expires } = generateTokenWithExpiry(60 * 60 * 1000);

  await db.user.update({
    where: { email },
    data: {
      passwordResetToken: rawToken,
      passwordResetTokenExpires: expires,
    },
  });

  return { rawToken };
};

export const resetPassword = async (input: ResetPasswordInput) => {
  const { token, newPassword } = input;

  const user = await db.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpires: { gt: new Date() },
    },
  });
  if (!user) throw new AppError(400, "INVALID_OR_EXPIRED_TOKEN", "Invalid or expired token");

  const hash = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: { id: user.id },
    data: {
      password: hash,
      passwordResetToken: null,
      passwordResetTokenExpires: null,
    },
  });
};

export const socialLogin = async (email: string, name: string) => {
  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: {
      name: name || email.split("@")[0],
      email,
      password: null,
      role: "NORMAL",
      emailVerified: true,
    },
  });

  return jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );
};
