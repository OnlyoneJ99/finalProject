/*
  Warnings:

  - Added the required column `recipientId` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reception" ADD COLUMN     "recipientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
