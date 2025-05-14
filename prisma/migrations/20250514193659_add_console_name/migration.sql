/*
  Warnings:

  - Added the required column `name` to the `Console` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Console" ADD COLUMN     "name" TEXT NOT NULL;
