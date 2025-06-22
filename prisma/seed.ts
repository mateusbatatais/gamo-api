import { PrismaClient } from "@prisma/client";
import { createConsoles } from "./seeds/consoleSeed";
import { createVariants } from "./seeds/consoleVariantSeed";
import { createSkins } from "./seeds/consoleSkinSeed";
import { createGames } from "./seeds/gameSeed";
import { createAdminUser } from "./seeds/userSeed";
import { createBrands } from "./seeds/brandSeed";

const db = new PrismaClient();

async function main() {
  await createAdminUser(db);

  const brands = await createBrands(db);
  const consoles = await createConsoles(db, brands);
  const variants = await createVariants(db, consoles);
  await createSkins(db, variants);

  await createGames(db);

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
