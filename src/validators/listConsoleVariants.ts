// src/validators/listConsoleVariants.ts
import { z } from "zod";

export const listConsoleVariantsSchema = z.object({
  query: z.object({
    brand: z.union([z.string(), z.array(z.string())]).optional(), // Aqui aceitamos tanto string quanto array de strings
    locale: z.enum(["pt", "en"]).refine((val) => !!val, {
      message: "Locale é obrigatório",
    }),
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
