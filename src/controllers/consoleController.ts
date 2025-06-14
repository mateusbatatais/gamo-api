// src/controllers/consoleController.ts
import { Request, Response, NextFunction } from "express";
import { getConsoleVariants } from "../services/consoleService";

export const listConsoleVariantsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    // Extrair e converter parâmetros
    const brand = req.query.brand ? (req.query.brand as string).split(",") : undefined;

    const generation = req.query.generation
      ? (req.query.generation as string).split(",").map(Number)
      : undefined;

    const locale = (req.query.locale as string) || "pt";
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 20;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const variants = await getConsoleVariants({
      brand,
      generation,
      locale,
      skip,
      take,
    });

    return res.json(variants);
  } catch (err) {
    next(err);
  }
};
