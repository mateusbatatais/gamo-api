-- CreateTable
CREATE TABLE "UserConsole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "consoleId" INTEGER NOT NULL,
    "consoleVariantId" INTEGER NOT NULL,
    "skinId" INTEGER,
    "customSkin" TEXT,
    "note" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserConsole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserConsole" ADD CONSTRAINT "UserConsole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConsole" ADD CONSTRAINT "UserConsole_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConsole" ADD CONSTRAINT "UserConsole_consoleVariantId_fkey" FOREIGN KEY ("consoleVariantId") REFERENCES "ConsoleVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConsole" ADD CONSTRAINT "UserConsole_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
