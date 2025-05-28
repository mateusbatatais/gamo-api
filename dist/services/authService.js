"use strict";
// src/services/authService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
const db_1 = require("../lib/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Tempo de expiração do token
const TOKEN_EXPIRES_IN = "7d";
// Gera o JWT a partir de um userId
function signToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: TOKEN_EXPIRES_IN,
    });
}
/**
 * Cria um novo usuário e retorna um JWT.
 * @throws se campos estiverem faltando ou e-mail já existir
 */
function signup(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = input;
        if (!name || !email || !password) {
            throw new Error("Missing fields");
        }
        const exists = yield db_1.db.user.findUnique({ where: { email } });
        if (exists) {
            throw new Error("User already exists");
        }
        const hash = yield bcrypt_1.default.hash(password, 10);
        const user = yield db_1.db.user.create({
            data: { name, email, password: hash },
        });
        return signToken(user.id);
    });
}
/**
 * Autentica um usuário existente e retorna um JWT.
 * @throws se credenciais forem inválidas
 */
function login(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = input;
        if (!email || !password) {
            throw new Error("Missing fields");
        }
        const user = yield db_1.db.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            throw new Error("Invalid credentials");
        }
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid credentials");
        }
        return signToken(user.id);
    });
}
