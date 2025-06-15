// validate.middleware.ts
import { RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod"; // Importe ZodSchema

// Aceita qualquer schema Zod (incluindo refinados)
export const validate = (schema: ZodSchema): RequestHandler => {
  const handler: RequestHandler = (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({
          code: "VALIDATION_ERROR",
          errors: error.errors,
        });
        return;
      }
      next(error);
      return;
    }
  };
  return handler;
};

// Validador para query parameters
export const validateQuery = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({
          code: "VALIDATION_ERROR",
          errors: error.errors,
        });
        return;
      }
      next(error);
    }
  };
};
