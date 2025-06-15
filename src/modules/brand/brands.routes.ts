// src/routes/brand.routes.ts
import { Router } from "express";
import { listBrandsHandler } from "./brand.controller";

const router = Router();

// Rota simplificada sem validação
router.get("/", listBrandsHandler);

export default router;
