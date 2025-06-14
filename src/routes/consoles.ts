import { Router } from "express";
import { listConsoleVariants } from "../controllers/console.controller";
import { validate } from "../middleware/validate";
import { ListConsoleVariantsSchema } from "../schemas/console.schema";

const router = Router();

router.get("/", validate(ListConsoleVariantsSchema), listConsoleVariants);

export default router;
