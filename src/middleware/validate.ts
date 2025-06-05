// src/middleware/validate.ts
import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject): RequestHandler =>
  (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "errors" in err) {
        res.status(400).json({
          error: "Validação falhou",
          details: (err as { errors: unknown }).errors,
        });
      } else {
        res.status(400).json({
          error: "Validação falhou",
          details: err,
        });
      }
      return;
    }
  };
