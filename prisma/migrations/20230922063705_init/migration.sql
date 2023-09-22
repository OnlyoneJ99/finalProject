/*
  Warnings:

  - Added the required column `senderId` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reception" ADD COLUMN     "senderId" TEXT NOT NULL;
