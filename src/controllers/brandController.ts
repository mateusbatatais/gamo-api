// src/controllers/brandController.ts
import { RequestHandler } from "express";
import { getBrands } from "../services/brandService";
import { BrandDTO } from "../dtos/brand.dto";
import { ListBrandsDTO } from "../validators/listBrands";

export const listBrandsHandler: RequestHandler<object, BrandDTO[], object, ListBrandsDTO> = async (
  req,
  res,
  next,
) => {
  try {
    const brands: BrandDTO[] = await getBrands();
    res.json(brands);
  } catch (err) {
    next(err);
  }
};
