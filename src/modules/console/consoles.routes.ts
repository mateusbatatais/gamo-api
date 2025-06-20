// src/routes/consoles.routes.ts
import { Router } from "express";
import { getConsoleVariant, listConsoleVariants } from "./console.controller";

const router = Router();

// Use o array de middlewares corretamente
router.get("/", ...listConsoleVariants);
router.get("/:slug", getConsoleVariant);

export default router;
