-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('OWNED', 'SELLING', 'WISHLIST');

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Console" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "Console_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsoleVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "consoleId" INTEGER NOT NULL,

    CONSTRAINT "ConsoleVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skin" (
    "id" SERIAL NOT NULL,
    "consoleVariantId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkinTranslation" (
    "id" SERIAL NOT NULL,
    "skinId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkinTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessory" (
    "id" SERIAL NOT NULL,
    "consoleId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Accessory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessoryTranslation" (
    "id" SERIAL NOT NULL,
    "accessoryId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "AccessoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameTranslation" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "GameTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameEdition" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "consoleId" INTEGER NOT NULL,
    "coverUrl" TEXT,

    CONSTRAINT "GameEdition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "consoleId" INTEGER NOT NULL,
    "status" "ItemStatus" NOT NULL,
    "customName" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Console_slug_key" ON "Console"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Console_nickname_key" ON "Console"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "ConsoleVariant_consoleId_slug_key" ON "ConsoleVariant"("consoleId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Skin_slug_key" ON "Skin"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SkinTranslation_skinId_locale_key" ON "SkinTranslation"("skinId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Accessory_slug_key" ON "Accessory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AccessoryTranslation_accessoryId_locale_key" ON "AccessoryTranslation"("accessoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GameTranslation_gameId_locale_key" ON "GameTranslation"("gameId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "GameEdition_gameId_consoleId_key" ON "GameEdition"("gameId", "consoleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Console" ADD CONSTRAINT "Console_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsoleVariant" ADD CONSTRAINT "ConsoleVariant_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skin" ADD CONSTRAINT "Skin_consoleVariantId_fkey" FOREIGN KEY ("consoleVariantId") REFERENCES "ConsoleVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinTranslation" ADD CONSTRAINT "SkinTranslation_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessoryTranslation" ADD CONSTRAINT "AccessoryTranslation_accessoryId_fkey" FOREIGN KEY ("accessoryId") REFERENCES "Accessory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTranslation" ADD CONSTRAINT "GameTranslation_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEdition" ADD CONSTRAINT "GameEdition_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEdition" ADD CONSTRAINT "GameEdition_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
