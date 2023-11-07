/*
  Warnings:

  - Made the column `customerId` on table `Suscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "subscriptionType" AS ENUM ('YES', 'ABSOLUTELY');

-- CreateEnum
CREATE TYPE "EnumSubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELED', 'UNPAID');

-- DropIndex
DROP INDEX "Suscriptions_currentPeriodEnd_key";

-- DropIndex
DROP INDEX "Suscriptions_priceId_key";

-- DropIndex
DROP INDEX "Suscriptions_subscriptionId_key";

-- AlterTable
ALTER TABLE "Suscriptions" ADD COLUMN     "status" "EnumSubscriptionStatus" DEFAULT 'ACTIVE',
ADD COLUMN     "subscriptionType" "subscriptionType",
ALTER COLUMN "customerId" SET NOT NULL;
