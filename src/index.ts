import express from "express";
import userConsolesRouter from "./routes/userConsoles";

const app = express();
app.use(express.json());

// Todas as requisições a /api/user/consoles
// vão para o router definido em src/routes/userConsoles.ts
app.use("/api/user/consoles", userConsolesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server rodando em http://localhost:${PORT}`)
);
