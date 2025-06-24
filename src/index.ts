import app from "../src/app";

const rawPort = process.env.PORT;
if (!rawPort) {
  console.error("❌ PORT não definida!");
  process.exit(1);
}

const PORT = Number(rawPort);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server rodando em 0.0.0.0:${PORT}`);
});
