-- CreateTable
CREATE TABLE "tiktokPages" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_picture_url" TEXT NOT NULL,
    "followers_count" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,

    CONSTRAINT "tiktokPages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SocialConnectionTotiktokPages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SocialConnectionTotiktokPages_AB_unique" ON "_SocialConnectionTotiktokPages"("A", "B");

-- CreateIndex
CREATE INDEX "_SocialConnectionTotiktokPages_B_index" ON "_SocialConnectionTotiktokPages"("B");

-- AddForeignKey
ALTER TABLE "tiktokPages" ADD CONSTRAINT "tiktokPages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SocialConnectionTotiktokPages" ADD CONSTRAINT "_SocialConnectionTotiktokPages_A_fkey" FOREIGN KEY ("A") REFERENCES "SocialConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SocialConnectionTotiktokPages" ADD CONSTRAINT "_SocialConnectionTotiktokPages_B_fkey" FOREIGN KEY ("B") REFERENCES "tiktokPages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
