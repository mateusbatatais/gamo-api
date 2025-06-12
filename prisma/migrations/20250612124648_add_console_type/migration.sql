/*
  Warnings:

  - The `generation` column on the `Console` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Console" ADD COLUMN     "type" TEXT,
DROP COLUMN "generation",
ADD COLUMN     "generation" INTEGER;
