// src/controllers/brandController.ts
import { RequestHandler } from "express";
import { getBrands } from "../services/brandService";
import { BrandDTO } from "../dtos/brand.dto";
import { ListBrandsDTO, listBrandsSchema } from "../validators/listBrands"; // Usando o esquema de validação

export const listBrandsHandler: RequestHandler<object, BrandDTO[], object, ListBrandsDTO> = async (
  req,
  res,
  next,
) => {
  try {
    // Aqui você deve aplicar a validação no corpo da requisição
    listBrandsSchema.parse(req); // Valida os parâmetros da requisição usando Zod

    const brands: BrandDTO[] = await getBrands();
    res.json(brands);
  } catch (err) {
    next(err);
  }
};
