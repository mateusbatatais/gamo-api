"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userConsoles.ts
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const userConsoleService_1 = require("../services/userConsoleService");
const userConsole_1 = require("../validators/userConsole");
const router = (0, express_1.Router)();
// GET /api/user/consoles
router.get("/", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const consoles = yield (0, userConsoleService_1.listUserConsoles)(userId);
    res.json(consoles);
}));
// POST /api/user/consoles
router.post("/", auth_1.authMiddleware, (0, validate_1.validate)(userConsole_1.createUserConsoleSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const data = req.body;
    const record = yield (0, userConsoleService_1.addUserConsole)(userId, data);
    res.status(201).json(record);
}));
exports.default = router;
