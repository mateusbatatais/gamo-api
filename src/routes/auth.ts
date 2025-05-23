// src/routes/auth.ts
import { Router } from "express";
import { signup, login, socialLogin } from "../controllers/authController";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/social/google", firebaseAuthMiddleware, socialLogin);

export default router;
