"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.socialLogin = socialLogin;
const authService = __importStar(require("../services/authService"));
const db_1 = require("../lib/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield authService.signup(req.body);
            res.status(201).json({ token });
            // <-- sem return
        }
        catch (err) {
            if (err.message === "User already exists") {
                res.status(409).json({ error: err.message });
                return;
            }
            if (err.message === "Missing fields") {
                res.status(400).json({ error: err.message });
                return;
            }
            next(err);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield authService.login(req.body);
            res.json({ token });
            // <-- sem return
        }
        catch (err) {
            if (err.message === "Invalid credentials") {
                res.status(401).json({ error: err.message });
                return;
            }
            if (err.message === "Missing fields") {
                res.status(400).json({ error: err.message });
                return;
            }
            next(err);
        }
    });
}
function socialLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // O middleware firebaseAuthMiddleware já colocou o decoded token aqui
            const firebaseUser = req.firebaseUser;
            const { uid, email, name, picture } = firebaseUser;
            // Upsert do usuário no seu banco
            const user = yield db_1.db.user.upsert({
                where: { email },
                update: {},
                create: {
                    name: name || email.split("@")[0],
                    email,
                    password: null, // senha não usada
                    role: "NORMAL",
                    // você pode salvar também firebaseUid: uid em um campo extra
                }
            });
            // Emita seu próprio JWT
            const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.json({ token });
        }
        catch (err) {
            next(err);
        }
    });
}
