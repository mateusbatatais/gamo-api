import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import userConsolesRouter from "./routes/userConsoles";
import userProfileRouter from "./routes/userProfile";
import { AppError } from "./shared/errors";
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

// 3.2. Consoles do usuário
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
