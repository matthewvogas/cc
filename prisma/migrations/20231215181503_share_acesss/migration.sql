-- CreateEnum
CREATE TYPE "typeAcess" AS ENUM ('CAMPAIGN');

-- CreateTable
CREATE TABLE "ShareAccess" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "type" "typeAcess",

    CONSTRAINT "ShareAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareAccess_token_key" ON "ShareAccess"("token");
