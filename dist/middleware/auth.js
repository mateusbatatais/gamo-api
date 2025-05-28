"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Declaramos como RequestHandler (retorna void)
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        res.status(401).json({ error: "Token faltando" });
        return; // retorna void, sem devolver o `res`
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.userId };
        next(); // segue adiante
    }
    catch (_a) {
        res.status(401).json({ error: "Token inválido" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
