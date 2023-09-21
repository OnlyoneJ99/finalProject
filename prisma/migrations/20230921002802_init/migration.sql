/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_username_phonenumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
