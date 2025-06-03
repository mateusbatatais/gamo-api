// src/index.ts
import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import userConsolesRouter from "./routes/userConsoles";
import userProfileRouter from "./routes/userProfile";
import { AppError } from "./utils/errors";
import cors from "cors";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;
console.log("→ FRONTEND_URL (env) =", FRONTEND_URL);

if (!FRONTEND_URL) {
  console.error("❌ FRONTEND_URL não configurada!");
  process.exit(1);
}

// Middleware para logar o origin que chega
app.use((req, res, next) => {
  console.log("→ Incoming request Origin:", req.headers.origin);
  next();
});

// Configuração CORS
const allowedOrigins = [
  FRONTEND_URL,
  FRONTEND_URL.replace(/^https:\/\//, "http://"),
];
// (ou adicione "https://gamo.games" se precisar aceitar sem www)
app.use(
  cors({
    origin: (incomingOrigin: string, callback: any) => {
      if (!incomingOrigin) return callback(null, true);
      if (allowedOrigins.includes(incomingOrigin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS: origem não autorizada"), false);
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Permite preflight para todas as rotas
app.options("*", cors());

// Body parser
app.use(express.json());

// Rotas principais
app.use("/api/auth", authRouter);
app.use("/api/user", userProfileRouter);
app.use("/api/user/consoles", authMiddleware, userConsolesRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Middleware global de erro
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("[GLOBAL ERROR]", err);
    if (res.headersSent) {
      return next(err);
    }
    if (err instanceof AppError) {
      return res
        .status(err.statusCode)
        .json({ code: err.code, message: err.message });
    }
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
    });
  }
);

const rawPort = process.env.PORT;
if (!rawPort) {
  console.error("❌ PORT não definida!");
  process.exit(1);
}
const PORT = Number(rawPort);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server rodando em 0.0.0.0:${PORT}`);
});
