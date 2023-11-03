/*
  Warnings:

  - Made the column `customerId` on table `Suscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Suscriptions" ALTER COLUMN "customerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "image_url" TEXT;
