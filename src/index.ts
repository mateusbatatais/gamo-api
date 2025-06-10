// src/index.ts

import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import userConsolesRouter from "./routes/userConsoles";
import userProfileRouter from "./routes/userProfile";
import { AppError } from "./utils/errors";
import uploadRoutes from "./routes/uploadRoutes";
import consolesRouter from "./routes/consoles";
import brandsRouter from "./routes/brands";

const app = express();

// ---------------------------------------------------------------
// 1. Middlewares globais
// ---------------------------------------------------------------

// 1.1. CORS
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// 1.2. Parser de JSON
app.use(express.json());

// ---------------------------------------------------------------
// 2. Rotas públicas
// ---------------------------------------------------------------

// 2.1. Autenticação (signup, login, recover, etc.) – não requer token
app.use("/api/auth", authRouter);

// 2.2. Consoles (listagem de consoles, variantes, etc.) – não requer token
app.use("/api/consoles", consolesRouter);
app.use("/api/brands", brandsRouter);

// ---------------------------------------------------------------
// 3. Rotas protegidas (precisam de token JWT válido)
// ---------------------------------------------------------------

// 3.1. Perfil do usuário
//    Dentro de userProfileRouter, cada endpoint já aplica authMiddleware.
app.use("/api/user", userProfileRouter);

// 3.2. Consoles do usuário
//    Aqui deixamos explícito que todas as rotas em /api/user/consoles devem passar pelo authMiddleware.
app.use("/api/user/consoles", authMiddleware, userConsolesRouter);

app.use("/api/uploads", uploadRoutes);

// ---------------------------------------------------------------
// 4. Health check
// ---------------------------------------------------------------

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------
// 5. Middleware global de tratamento de erro (sempre por último)
// ---------------------------------------------------------------

const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  console.error("[GLOBAL ERROR]", err);

  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
  });
};

app.use(errorHandler);

// ---------------------------------------------------------------
// 6. Inicialização do servidor
// ---------------------------------------------------------------

const rawPort = process.env.PORT;
if (!rawPort) {
  console.error("❌ PORT não definida!");
  process.exit(1);
}

const PORT = Number(rawPort);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server rodando em 0.0.0.0:${PORT}`);
});
