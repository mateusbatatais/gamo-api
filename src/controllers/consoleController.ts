// src/controllers/consoleController.ts
import { Request, Response, NextFunction } from "express";
import { getConsoleVariants } from "../services/consoleService";
import { AppError } from "../utils/errors";
import { ListConsoleVariantsDTO } from "../validators/listConsoleVariants";
import { ListConsoleVariantsOptions } from "../repositories/consoleRepository";

export const listConsoleVariantsHandler = async (
  req: Request<object, object, object, ListConsoleVariantsDTO>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { brand, locale = "pt", page = 1, perPage = 20 } = req.query;

    const skip = (page - 1) * perPage;
    const take = perPage;

    if (!locale) {
      throw new AppError(400, "LOCALE_NEEDED", "O parâmetro 'locale' é obrigatório.");
    }

    const options: ListConsoleVariantsOptions = {
      brandSlug: brand,
      locale,
      skip,
      take,
    };

    const variants = await getConsoleVariants(options);
    return res.json(variants);
  } catch (err) {
    next(err);
  }
};
