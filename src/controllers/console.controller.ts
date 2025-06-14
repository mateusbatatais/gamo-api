import { Request, Response, NextFunction } from "express";
import { getConsoleVariants } from "../services/console.service";
import { ListConsoleVariantsInput } from "../schemas/console.schema";

type QueryParams = {
  brand?: string;
  generation?: string;
  locale?: string;
  page?: string;
  perPage?: string;
};

export const listConsoleVariants = async (
  req: Request<object, object, object, QueryParams>,
  res: Response,
  next: NextFunction, // Adicione este parâmetro
) => {
  try {
    // Extrair e converter parâmetros manualmente
    const { brand = "", generation = "", locale = "pt", page = "1", perPage = "20" } = req.query;

    // Conversão explícita
    const input: ListConsoleVariantsInput = {
      brand,
      generation,
      locale: locale as "pt" | "en",
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10),
    };

    const brandArray = input.brand ? input.brand.split(",") : undefined;
    const generationArray = input.generation
      ? input.generation
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n))
      : undefined;

    const result = await getConsoleVariants({
      brand: brandArray,
      generation: generationArray,
      locale: input.locale,
      skip: (input.page - 1) * input.perPage,
      take: input.perPage,
    });

    res.json(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};
