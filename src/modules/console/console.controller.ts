// console.controller.ts
import { Request, Response, NextFunction } from "express";
import { getConsoleVariants, getConsoleVariantWithSkins } from "./console.service";
import { ListConsoleVariantsSchema } from "./console.schema";
import { validateQuery } from "../../middleware/validate.middleware.ts";

export const listConsoleVariants = [
  validateQuery(ListConsoleVariantsSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Obter parâmetros já validados e convertidos pelo Zod
      const queryParams = ListConsoleVariantsSchema.parse(req.query);

      // Preparar arrays para filtros
      const brandArray = queryParams.brand
        ? queryParams.brand.split(",").filter(Boolean)
        : undefined;

      const generationArray = queryParams.generation
        ? queryParams.generation
            .split(",")
            .map((n) => parseInt(n.trim(), 10))
            .filter((n) => !isNaN(n))
        : undefined;

      // Obter resultados
      const result = await getConsoleVariants({
        brand: brandArray,
        generation: generationArray,
        locale: queryParams.locale,
        skip: (queryParams.page - 1) * queryParams.perPage,
        take: queryParams.perPage,
        search: queryParams.search,
      });

      res.json(result);
    } catch (error) {
      console.error("Error in listConsoleVariants:", error);
      next(error);
    }
  },
];

export const getConsoleVariant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const locale = (req.query.locale as string) || "pt";

    const variant = await getConsoleVariantWithSkins(slug, locale);
    res.json(variant);
  } catch (error) {
    next(error);
  }
};
