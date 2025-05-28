"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const firebaseAuth_1 = require("../middleware/firebaseAuth");
const router = (0, express_1.Router)();
router.post("/signup", authController_1.signup);
router.post("/login", authController_1.login);
router.post("/social/google", firebaseAuth_1.firebaseAuthMiddleware, authController_1.socialLogin);
exports.default = router;
