/*
  Warnings:

  - Added the required column `status` to the `UserConsole` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemCondition" AS ENUM ('NEW', 'LIKE_NEW', 'USED', 'POOR');

-- AlterTable
ALTER TABLE "Console" ALTER COLUMN "generation" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "UserConsole" ADD COLUMN     "acceptTrade" BOOLEAN,
ADD COLUMN     "box" BOOLEAN,
ADD COLUMN     "condition" "ItemCondition",
ADD COLUMN     "manual" BOOLEAN,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "status" "ItemStatus" NOT NULL;

-- CreateTable
CREATE TABLE "UserConsolePhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "userConsoleId" INTEGER NOT NULL,

    CONSTRAINT "UserConsolePhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserConsolePhoto" ADD CONSTRAINT "UserConsolePhoto_userConsoleId_fkey" FOREIGN KEY ("userConsoleId") REFERENCES "UserConsole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
