import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

import { createAdminUser } from "./seeds/userSeed";
import { createBrands } from "./seeds/brandSeed";
import { createConsoles } from "./seeds/consoleSeed";
import { createConsoleVariants } from "./seeds/consoleVariantSeed";
import { createSkins } from "./seeds/consoleSkinSeed";
import { createGames } from "./seeds/gameSeed";

async function main() {
  // 0. Criar Usuário Admin
  await createAdminUser();

  // 1. Criar Marcas
  await createBrands();

  // 2. Criar Consoles
  await createConsoles();

  // 3. Criar Variações dos Consoles
  await createConsoleVariants();

  // 4. Criar Skins dos Consoles
  await createSkins();

  // 5. Criar Jogos
  await createGames();

  console.log("✅ Seed completo!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
