import { z } from "zod";

// User Profile
export const userProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  description: z.string().nullable().optional(),
  role: z.string(),
  profileImage: z.string().nullable().optional(),
});

// Update Profile
export const updateProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  description: z.string().optional(),
  profileImage: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });

// Types
export type UserProfile = z.infer<typeof userProfileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
