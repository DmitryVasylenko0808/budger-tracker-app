/*
  Warnings:

  - You are about to drop the `confirmation_codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('GOOGLE', 'GITHUB');

-- CreateEnum
CREATE TYPE "ConfirmationTokenType" AS ENUM ('EMAIL_CONFIRMATION', 'RESET_PASSWORD');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" "ProviderType",
ADD COLUMN     "provider_id" TEXT;

-- DropTable
DROP TABLE "confirmation_codes";

-- DropEnum
DROP TYPE "ConfirmationCodeType";

-- CreateTable
CREATE TABLE "confirmation_tokens" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "type" "ConfirmationTokenType" NOT NULL,

    CONSTRAINT "confirmation_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "confirmation_tokens_value_key" ON "confirmation_tokens"("value");
