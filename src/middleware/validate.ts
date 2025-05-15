// src/middleware/validate.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
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
    } catch (err: any) {
      res.status(400).json({
        error: "Validação falhou",
        details: err.errors,
      });
      return;
    }
  };
