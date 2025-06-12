import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

export async function createAdminUser() {
  await db.user.upsert({
    where: { email: "admin@gamo.games" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@gamo.games",
      password: await bcrypt.hash("1234", 10),
      role: "SUPER_ADMIN",
      emailVerified: true,
    },
  });
}
