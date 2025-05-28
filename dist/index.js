"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const auth_2 = require("./middleware/auth");
const userConsoles_1 = __importDefault(require("./routes/userConsoles"));
const userProfile_1 = __importDefault(require("./routes/userProfile"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/user", userProfile_1.default);
app.use("/api/user/consoles", auth_2.authMiddleware, userConsoles_1.default);
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error("PORT não definida");
}
app.listen(PORT, () => console.log(`🚀 Server rodando em http://localhost:${PORT}`));
