// src/routes/consoles.ts
import { RequestHandler, Router } from "express";
import { listConsoleVariantsHandler } from "../controllers/consoleController";
import { validate } from "../middleware/validate";
import { listConsoleVariantsSchema } from "../validators/listConsoleVariants";

const router = Router();

router.get(
  "/",
  validate(listConsoleVariantsSchema),
  listConsoleVariantsHandler as unknown as RequestHandler,
);

export default router;
