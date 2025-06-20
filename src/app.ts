import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import userProfileRouter from "./modules/user/user.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import consolesRouter from "./modules/console/consoles.routes";
import brandsRouter from "./modules/brand/brands.routes";
import { AppError } from "./shared/errors";
import userConsoleRouter from "./modules/userConsole/userConsole.routes";

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
