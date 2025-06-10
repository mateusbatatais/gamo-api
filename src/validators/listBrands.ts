import { z } from "zod";

// Não há parâmetros de query para este endpoint
export const listBrandsSchema = z.object({
  query: z.object({}).optional(),
});

export type ListBrandsDTO = object;
