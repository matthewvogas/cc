-- CreateTable
CREATE TABLE "AccessCampaign" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "CampaignId" INTEGER NOT NULL,
    "accessType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "email" TEXT,

    CONSTRAINT "AccessCampaign_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccessCampaign" ADD CONSTRAINT "AccessCampaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessCampaign" ADD CONSTRAINT "AccessCampaign_CampaignId_fkey" FOREIGN KEY ("CampaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
