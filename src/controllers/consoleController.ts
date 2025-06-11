// src/controllers/consoleController.ts
import { Request, Response, NextFunction } from "express";
import { getConsoleVariants } from "../services/consoleService";
import { AppError } from "../utils/errors";
import { ListConsoleVariantsDTO } from "../validators/listConsoleVariants";
import { listConsoleVariantsSchema } from "../validators/listConsoleVariants";

export const listConsoleVariantsHandler = async (
  req: Request<object, object, object, ListConsoleVariantsDTO>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    // Validação dos parâmetros de consulta com o Zod
    const { success, error } = listConsoleVariantsSchema.safeParse(req);
    if (!success) {
      throw new AppError(400, "INVALID_INPUT", error.errors.map((e) => e.message).join(", "));
    }

    const { brand, locale = "pt", page = 1, perPage = 20 } = req.query;

    // Transformar os parâmetros page e perPage para números inteiros
    const skip = (Number(page) - 1) * Number(perPage); // Convertendo para número
    const take = Number(perPage); // Convertendo para número

    const options = {
      brandSlug: brand,
      locale,
      skip,
      take,
    };

    // Verificando a consulta no serviço
    const variants = await getConsoleVariants(options);
    return res.json(variants);
  } catch (err) {
    next(err);
  }
};
