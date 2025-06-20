/*
  Warnings:

  - The values [LIKE_NEW,POOR] on the enum `ItemCondition` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `acceptTrade` on the `UserConsole` table. All the data in the column will be lost.
  - You are about to drop the column `box` on the `UserConsole` table. All the data in the column will be lost.
  - You are about to drop the column `manual` on the `UserConsole` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `UserConsole` table. All the data in the column will be lost.
  - You are about to drop the `UserConsolePhoto` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `UserConsole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ConsoleStatus" AS ENUM ('OWNED', 'SELLING', 'LOOKING_FOR');

-- AlterEnum
BEGIN;
CREATE TYPE "ItemCondition_new" AS ENUM ('NEW', 'USED', 'REFURBISHED');
ALTER TABLE "UserConsole" ALTER COLUMN "condition" TYPE "ItemCondition_new" USING ("condition"::text::"ItemCondition_new");
ALTER TYPE "ItemCondition" RENAME TO "ItemCondition_old";
ALTER TYPE "ItemCondition_new" RENAME TO "ItemCondition";
DROP TYPE "ItemCondition_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "UserConsolePhoto" DROP CONSTRAINT "UserConsolePhoto_userConsoleId_fkey";

-- AlterTable
ALTER TABLE "UserConsole" DROP COLUMN "acceptTrade",
DROP COLUMN "box",
DROP COLUMN "manual",
DROP COLUMN "note",
ADD COLUMN     "acceptsTrade" BOOLEAN DEFAULT false,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hasBox" BOOLEAN DEFAULT false,
ADD COLUMN     "hasManual" BOOLEAN DEFAULT false,
DROP COLUMN "status",
ADD COLUMN     "status" "ConsoleStatus" NOT NULL;

-- DropTable
DROP TABLE "UserConsolePhoto";
