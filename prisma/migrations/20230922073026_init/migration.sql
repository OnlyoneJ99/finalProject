/*
  Warnings:

  - The primary key for the `Reception` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transfer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Reception" DROP CONSTRAINT "Reception_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reception_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reception_id_seq";

-- AlterTable
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transfer_id_seq";
