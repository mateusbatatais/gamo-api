import { z } from "zod";

export const UserConsoleInputSchema = z.object({
  consoleId: z.number(),
  consoleVariantId: z.number(),
  skinId: z.number().optional(),
  customSkin: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["OWNED", "SELLING", "LOOKING_FOR"]),
  price: z.number().optional(),
  hasBox: z.boolean().optional(),
  hasManual: z.boolean().optional(),
  condition: z.enum(["NEW", "USED", "REFURBISHED"]).optional(),
  acceptsTrade: z.boolean().optional(),
  photoMain: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

export type UserConsoleInput = z.infer<typeof UserConsoleInputSchema>;

export const UserConsoleUpdateSchema = UserConsoleInputSchema.partial();
export type UserConsoleUpdate = z.infer<typeof UserConsoleUpdateSchema>;

export const UserConsoleResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  consoleId: z.number(),
  consoleVariantId: z.number(),
  skinId: z.number().nullable(),
  customSkin: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string(),
  price: z.number().nullable(),
  hasBox: z.boolean().nullable(),
  hasManual: z.boolean().nullable(),
  condition: z.string().nullable(),
  acceptsTrade: z.boolean().nullable(),
  photoMain: z.string().nullable(),
  photos: z.array(z.string()).nullable(),
  createdAt: z.date(),
});

export type UserConsoleResponse = z.infer<typeof UserConsoleResponseSchema>;
