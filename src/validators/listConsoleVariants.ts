// src/validators/listConsoleVariants.ts
import { z } from "zod";

export const listConsoleVariantsSchema = z.object({
  query: z.object({
    brand: z.string().optional(),
    locale: z.enum(["pt", "en"]).optional(),
    page: z
      .string()
      .transform((val) => Number(val))
      .refine((n) => !isNaN(n) && n >= 1, { message: "page deve ser ≥ 1" })
      .optional(),
    perPage: z
      .string()
      .transform((val) => Number(val))
      .refine((n) => !isNaN(n) && n >= 1, { message: "perPage deve ser ≥ 1" })
      .optional(),
  }),
});
export type ListConsoleVariantsDTO = z.infer<typeof listConsoleVariantsSchema>["query"];
