-- CreateTable
CREATE TABLE "_SocialConnectionToinstagramPages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SocialConnectionToinstagramPages_AB_unique" ON "_SocialConnectionToinstagramPages"("A", "B");

-- CreateIndex
CREATE INDEX "_SocialConnectionToinstagramPages_B_index" ON "_SocialConnectionToinstagramPages"("B");

-- AddForeignKey
ALTER TABLE "_SocialConnectionToinstagramPages" ADD CONSTRAINT "_SocialConnectionToinstagramPages_A_fkey" FOREIGN KEY ("A") REFERENCES "SocialConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SocialConnectionToinstagramPages" ADD CONSTRAINT "_SocialConnectionToinstagramPages_B_fkey" FOREIGN KEY ("B") REFERENCES "instagramPages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
