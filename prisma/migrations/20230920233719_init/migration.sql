/*
  Warnings:

  - A unique constraint covering the columns `[username,phonenumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_phonenumber_key";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Transfers" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recipient_name" TEXT NOT NULL,

    CONSTRAINT "Transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receptions" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recipient_name" TEXT NOT NULL,

    CONSTRAINT "Receptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_phonenumber_key" ON "Users"("username", "phonenumber");
