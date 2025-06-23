import app from "./app";

const rawPort = process.env.PORT;
if (!rawPort) {
  console.error("❌ PORT não definida!");
  process.exit(1);
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
