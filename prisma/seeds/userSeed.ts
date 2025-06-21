import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function createAdminUser(db: PrismaClient) {
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Super Admin",
      slug: "super-admin",
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 10),
      role: "SUPER_ADMIN",
      emailVerified: true,
    },
  });
}
