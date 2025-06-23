import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import userProfileRouter from "./modules/user/user.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import consolesRouter from "./modules/console/consoles.routes";
import brandsRouter from "./modules/brand/brands.routes";
import { AppError } from "./shared/errors";
import userConsoleRouter from "./modules/userConsole/userConsole.routes";
import publicProfileRouter from "./modules/publicProfile/publicProfile.routes";

const app = express();

// Middleware de log para todas as requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  next();
});

// ---------------------------------------------------------------
// 1. Middlewares globais
// ---------------------------------------------------------------

// 1.1. CORS com logs detalhados
app.use((req, res, next) => {
  console.log(`[CORS] Origin recebido: ${req.headers.origin}`);
  console.log(`[CORS] Método: ${req.method}`);
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// Adicionando handler explícito para OPTIONS com logs
app.options("*", (req, res) => {
  console.log("[CORS] Handling OPTIONS request");
  console.log(`[CORS] Origin: ${req.headers.origin}`);

  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  console.log("[CORS] Headers setados:", res.getHeaders());

  res.status(204).send();
});

// 1.2. Parser de JSON
app.use(express.json());

// ---------------------------------------------------------------
// 2. Rotas públicas
// ---------------------------------------------------------------

// 2.1. Autenticação
app.use("/api/auth", authRouter);

// 2.2. Consoles
app.use("/api/consoles", consolesRouter);
app.use("/api/brands", brandsRouter);

// ---------------------------------------------------------------
// 3. Rotas protegidas
// ---------------------------------------------------------------

// 3.1. Perfil do usuário
app.use("/api/user", userProfileRouter);
app.use("/api/user-consoles", userConsoleRouter);

app.use("/api/uploads", uploadRoutes);
app.use("/api/public/profile", publicProfileRouter);

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
// 5. Middleware global de tratamento de erro
// ---------------------------------------------------------------

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
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

export default app;
