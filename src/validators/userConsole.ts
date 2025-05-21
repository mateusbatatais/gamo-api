import { z } from "zod";

export const createUserConsoleSchema = z.object({
  body: z.object({
    consoleId: z.number(),
    variantSlug: z.string(),
    skinSlug: z.string().nullable().optional(),
    customSkin: z.string().optional(),
    note: z.string().optional(),
    photoUrl: z.string().url().optional(),
  }),
});
