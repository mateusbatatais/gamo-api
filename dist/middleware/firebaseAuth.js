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
exports.firebaseAuthMiddleware = void 0;
const firebase_1 = require("../utils/firebase");
const firebaseAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!(header === null || header === void 0 ? void 0 : header.startsWith("Bearer "))) {
        res.status(401).json({ error: "ID token não fornecido" });
        return; // apenas retorno vazio
    }
    const idToken = header.split(" ")[1];
    try {
        const decoded = yield firebase_1.firebaseAuth.verifyIdToken(idToken);
        req.firebaseUser = decoded;
        next();
    }
    catch (_a) {
        res.status(401).json({ error: "Token Firebase inválido" });
        return;
    }
});
exports.firebaseAuthMiddleware = firebaseAuthMiddleware;
