// src/index.ts
import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import userConsolesRouter from "./routes/userConsoles";
import userProfileRouter from "./routes/userProfile";
import { AppError } from "./utils/errors";

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// Rotas principais
app.use("/api/auth", authRouter);
app.use("/api/user", userProfileRouter);
app.use("/api/user/consoles", authMiddleware, userConsolesRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ---------- Middleware global de erro (sempre por último) ----------
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
