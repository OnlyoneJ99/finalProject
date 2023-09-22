/*
  Warnings:

  - You are about to drop the column `recipient_name` on the `Reception` table. All the data in the column will be lost.
  - Added the required column `sender_name` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reception" DROP COLUMN "recipient_name",
ADD COLUMN     "sender_name" TEXT NOT NULL;
