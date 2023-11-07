/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Suscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Suscriptions_user_id_key" ON "Suscriptions"("user_id");
