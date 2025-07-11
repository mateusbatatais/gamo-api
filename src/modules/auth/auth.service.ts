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
import { AppError } from "../../shared/errors";
import * as authRepository from "./auth.repository";
import { generateUniqueSlug } from "../../shared/slugify";

const TOKEN_EXPIRES_IN = "7d";

function signToken(user: {
  id: number;
  name: string;
  slug: string;
  email: string;
  profileImage: string | null;
  role: string;
  hasPassword: boolean;
}): string {
  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      slug: user.slug,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      hasPassword: user.hasPassword,
    },
    process.env.JWT_SECRET!,
    { expiresIn: TOKEN_EXPIRES_IN },
  );
}

function generateTokenWithExpiry(expireMs: number) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + expireMs);
  return { rawToken, expires };
}

export const signup = async (input: SignupInput) => {
  const { name, email, password } = input;

  const exists = await authRepository.findUserByEmail(email);
  if (exists) throw new AppError(409, "USER_ALREADY_EXISTS", "User already exists");

  const slug = await generateUniqueSlug(name);
  const hash = await bcrypt.hash(password, 10);
  const { rawToken, expires } = generateTokenWithExpiry(24 * 60 * 60 * 1000);

  const user = await authRepository.createUser({
    name,
    slug,
    email,
    password: hash,
    emailVerified: false,
    emailVerificationToken: rawToken,
    emailVerificationTokenExpires: expires,
  });

  return { userId: user.id, rawToken };
};

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await authRepository.findUserByEmail(email);
  if (!user || !user.password)
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  if (!user.emailVerified) throw new AppError(403, "EMAIL_NOT_VERIFIED", "Email not verified");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");

  return signToken({
    id: user.id,
    name: user.name,
    slug: user.slug,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
    hasPassword: true,
  });
};

export const resendVerificationToken = async (input: ResendVerificationInput) => {
  const { email } = input;

  const user = await authRepository.findUserByEmail(email);
  if (!user) throw new AppError(404, "USER_NOT_FOUND", "User not found");
  if (user.emailVerified) throw new AppError(400, "ALREADY_VERIFIED", "Email already verified");

  const { rawToken, expires } = generateTokenWithExpiry(24 * 60 * 60 * 1000);

  await authRepository.updateUserByEmail(email, {
    emailVerificationToken: rawToken,
    emailVerificationTokenExpires: expires,
  });

  return { rawToken };
};

export const createPasswordResetToken = async (input: RecoverPasswordInput) => {
  const { email } = input;

  const user = await authRepository.findUserByEmail(email);
  if (!user) throw new AppError(404, "USER_NOT_FOUND", "User not found");
  if (!user.emailVerified) throw new AppError(400, "EMAIL_NOT_VERIFIED", "Email not verified");

  const { rawToken, expires } = generateTokenWithExpiry(60 * 60 * 1000);

  await authRepository.updateUserByEmail(email, {
    passwordResetToken: rawToken,
    passwordResetTokenExpires: expires,
  });

  return { rawToken };
};

export const resetPassword = async (input: ResetPasswordInput) => {
  const { token, newPassword } = input;

  const user = await authRepository.findUserByPasswordResetToken(token);
  if (!user) throw new AppError(400, "INVALID_OR_EXPIRED_TOKEN", "Invalid or expired token");

  const hash = await bcrypt.hash(newPassword, 10);
  await authRepository.updateUserById(user.id, {
    password: hash,
    passwordResetToken: null,
    passwordResetTokenExpires: null,
  });
};

export const socialLogin = async (email: string, name: string) => {
  const normalizedEmail = email.replace(
    /^([^_]+?)_(gmail|hotmail|outlook|yahoo|icloud)\.([a-z]{2,3})#EXT#@.+$/i,
    "$1@$2.$3",
  );
  const slug = await generateUniqueSlug(name);

  const user = await authRepository.upsertUserByEmail(normalizedEmail, {
    name: name || normalizedEmail.split("@")[0],
    slug,
    email: normalizedEmail,
    password: null,
    role: "NORMAL",
    emailVerified: true,
  });

  return signToken({
    id: user.id,
    name: user.name,
    slug: user.slug,
    email: normalizedEmail,
    profileImage: user.profileImage,
    role: user.role,
    hasPassword: !!user.password,
  });
};
export const verifyEmail = async (token: string) => {
  const user = await authRepository.findUserByVerificationToken(token);
  if (!user) {
    throw new AppError(400, "INVALID_OR_EXPIRED_TOKEN", "Invalid or expired token");
  }

  await authRepository.updateUserById(user.id, {
    emailVerified: true,
    emailVerificationToken: null,
    emailVerificationTokenExpires: null,
  });
};
