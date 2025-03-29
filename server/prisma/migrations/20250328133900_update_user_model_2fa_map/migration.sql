/*
  Warnings:

  - You are about to drop the column `twoFa` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "twoFa",
ADD COLUMN     "two_fa" BOOLEAN NOT NULL DEFAULT false;
