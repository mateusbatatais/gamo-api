import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import userConsolesRouter from "./routes/userConsoles";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user/consoles", authMiddleware, userConsolesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server rodando em http://localhost:${PORT}`)
);
