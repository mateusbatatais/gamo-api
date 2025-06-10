// src/routes/brands.ts
import { Router } from "express";
import { listBrandsHandler } from "../controllers/brandController";
import { validate } from "../middleware/validate";
import { listBrandsSchema } from "../validators/listBrands";

const router = Router();

router.get("/", validate(listBrandsSchema), listBrandsHandler);

export default router;
