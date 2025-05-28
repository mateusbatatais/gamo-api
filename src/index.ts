// src/index.ts
import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import userConsolesRouter from "./routes/userConsoles";
import userProfileRouter from "./routes/userProfile";
import cors from "cors";

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

app.use("/api/auth", authRouter);
app.use("/api/user", userProfileRouter);
app.use("/api/user/consoles", authMiddleware, userConsolesRouter);

// Healthcheck + log quando chega requisição
app.get("/health", (_req, res) => {
  console.log("🏥 Healthcheck recebido");
  res.json({ status: "ok", time: new Date().toISOString() });
});

const rawPort = process.env.PORT;
if (!rawPort) {
  console.error("❌ PORT não definida!");
  process.exit(1);
}
const PORT = Number(rawPort);
console.log(`🔌 Tentando ouvir em 0.0.0.0:${PORT}…`);

// Escutar em todas as interfaces IPv4 (0.0.0.0)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server rodando em 0.0.0.0:${PORT}`);
});
