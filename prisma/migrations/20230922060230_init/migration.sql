/*
  Warnings:

  - The primary key for the `Reception` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Reception` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Transfer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Transfer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Reception" DROP CONSTRAINT "Reception_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Reception_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id");
