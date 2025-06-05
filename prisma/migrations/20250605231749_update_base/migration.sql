/*
  Warnings:

  - You are about to drop the column `name` on the `Console` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ConsoleVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Console" DROP COLUMN "name",
ADD COLUMN     "generation" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ConsoleVariant" DROP COLUMN "name",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "launchDate" TIMESTAMP(3),
ADD COLUMN     "storage" TEXT;

-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "editionName" TEXT,
ADD COLUMN     "finish" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "limitedEdition" BOOLEAN,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SkinTranslation" ADD COLUMN     "description" TEXT,
ADD COLUMN     "editionName" TEXT;

-- CreateTable
CREATE TABLE "ConsoleTranslation" (
    "id" SERIAL NOT NULL,
    "consoleId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ConsoleTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsoleVariantTranslation" (
    "id" SERIAL NOT NULL,
    "consoleVariantId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ConsoleVariantTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConsoleTranslation_locale_idx" ON "ConsoleTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "ConsoleTranslation_consoleId_locale_key" ON "ConsoleTranslation"("consoleId", "locale");

-- CreateIndex
CREATE INDEX "ConsoleVariantTranslation_locale_idx" ON "ConsoleVariantTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "ConsoleVariantTranslation_consoleVariantId_locale_key" ON "ConsoleVariantTranslation"("consoleVariantId", "locale");

-- CreateIndex
CREATE INDEX "AccessoryTranslation_locale_idx" ON "AccessoryTranslation"("locale");

-- CreateIndex
CREATE INDEX "GameTranslation_locale_idx" ON "GameTranslation"("locale");

-- CreateIndex
CREATE INDEX "SkinTranslation_locale_idx" ON "SkinTranslation"("locale");

-- AddForeignKey
ALTER TABLE "ConsoleTranslation" ADD CONSTRAINT "ConsoleTranslation_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsoleVariantTranslation" ADD CONSTRAINT "ConsoleVariantTranslation_consoleVariantId_fkey" FOREIGN KEY ("consoleVariantId") REFERENCES "ConsoleVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
