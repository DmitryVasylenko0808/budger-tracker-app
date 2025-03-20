-- CreateEnum
CREATE TYPE "ConfirmationCodeType" AS ENUM ('EMAIL_CONFIRMATION', 'RESET_PASSWORD', 'TWO_FA');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "confirmation_codes" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "type" "ConfirmationCodeType" NOT NULL,

    CONSTRAINT "confirmation_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "confirmation_codes_value_key" ON "confirmation_codes"("value");
