import { z } from "zod";

export const PublicUserProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  profileImage: z.string().nullable(),
  description: z.string().nullable(),
});

export type PublicUserProfile = z.infer<typeof PublicUserProfileSchema>;

export const UserConsolePublicSchema = z.object({
  id: z.number(),
  consoleId: z.number(),
  consoleName: z.string(),
  variantName: z.string(),
  skinName: z.string().nullable(),
  customSkin: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string(),
  price: z.number().nullable(),
  hasBox: z.boolean().nullable(),
  hasManual: z.boolean().nullable(),
  condition: z.string().nullable(),
  acceptsTrade: z.boolean().nullable(),
  photoUrl: z.string().nullable(),
  createdAt: z.date(),
});

export type UserConsolePublic = z.infer<typeof UserConsolePublicSchema>;

export const UserGamePublicSchema = z.object({
  id: z.number(),
  gameId: z.number(),
  gameTitle: z.string(),
  consoleName: z.string(),
  status: z.string(),
  customName: z.string().nullable(),
  photoUrl: z.string().nullable(),
});

export type UserGamePublic = z.infer<typeof UserGamePublicSchema>;
