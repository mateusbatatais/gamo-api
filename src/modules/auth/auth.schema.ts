import { z } from "zod";

// Signup
export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// Login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Resend Verification
export const resendVerificationSchema = z.object({
  email: z.string().email(),
  locale: z.string().optional(),
});

// Recover Password
export const recoverPasswordSchema = z.object({
  email: z.string().email(),
  locale: z.string().optional(),
});

// Reset Password
export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});

// Verify Email
export const verifyEmailSchema = z.object({
  token: z.string(),
});

// Types
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
export type RecoverPasswordInput = z.infer<typeof recoverPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
