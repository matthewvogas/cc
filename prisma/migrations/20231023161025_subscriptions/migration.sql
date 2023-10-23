-- CreateEnum
CREATE TYPE "payment_methods" AS ENUM ('STRIPE', 'PAYPAL');

-- CreateTable
CREATE TABLE "Suscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "payment_method" "payment_methods" NOT NULL,
    "customerId" TEXT,
    "subscriptionId" TEXT,
    "priceId" TEXT,
    "currentPeriodEnd" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Suscriptions_customerId_key" ON "Suscriptions"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Suscriptions_subscriptionId_key" ON "Suscriptions"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Suscriptions_priceId_key" ON "Suscriptions"("priceId");

-- CreateIndex
CREATE UNIQUE INDEX "Suscriptions_currentPeriodEnd_key" ON "Suscriptions"("currentPeriodEnd");

-- AddForeignKey
ALTER TABLE "Suscriptions" ADD CONSTRAINT "Suscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
