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
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userProfileRouter);
app.use("/api/user/consoles", authMiddleware, userConsolesRouter);

// rota para verificar se o servidor está vivo
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT não definida");
}
app.listen(PORT, () =>
  console.log(`🚀 Server rodando em http://localhost:${PORT}`)
);
