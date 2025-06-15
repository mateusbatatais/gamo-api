// src/routes/consoles.routes.ts
import { Router } from "express";
import { listConsoleVariants } from "./console.controller";

const router = Router();

// Use o array de middlewares corretamente
router.get("/", ...listConsoleVariants);

export default router;
