// src/schemas/brand.schema.ts
import { z } from "zod";

// Tipo de saída para uma marca
export const BrandSchema = z.object({
  id: z.number(),
  slug: z.string(),
});

export type Brand = z.infer<typeof BrandSchema>;

// NÃO é mais necessário ListBrandsSchema
