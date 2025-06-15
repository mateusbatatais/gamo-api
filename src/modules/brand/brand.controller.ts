// src/controllers/brand.controller.ts
import { RequestHandler } from "express";
import { getBrands } from "./brand.service";

// Remova completamente a validação
export const listBrandsHandler: RequestHandler = async (req, res, next) => {
  try {
    const brands = await getBrands();
    res.json(brands);
  } catch (err) {
    next(err);
  }
};
