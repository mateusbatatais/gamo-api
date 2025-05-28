"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAuth = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let serviceAccount;
const envVar = process.env.FIREBASE_SERVICE_ACCOUNT;
if (envVar) {
    try {
        // Tenta parsear JSON direto
        serviceAccount = JSON.parse(envVar);
    }
    catch (_a) {
        // Se falhar, assume que é base64
        const json = Buffer.from(envVar, "base64").toString("utf-8");
        serviceAccount = JSON.parse(json);
    }
}
else {
    // Fallback para ambiente local: lê o arquivo
    const filePath = path_1.default.resolve(process.cwd(), "firebase-key.json");
    const fileContents = fs_1.default.readFileSync(filePath, "utf-8");
    serviceAccount = JSON.parse(fileContents);
}
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
exports.firebaseAuth = firebase_admin_1.default.auth();
