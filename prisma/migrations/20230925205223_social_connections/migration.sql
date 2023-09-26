-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('FACEBOOK', 'TIKTOK', 'INSTAGRAM', 'PINTEREST');

-- CreateTable
CREATE TABLE "SocialConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "token" TEXT,
    "refreshToken" TEXT,
    "longToken" TEXT,

    CONSTRAINT "SocialConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CreatorToSocialConnection" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CreatorToSocialConnection_AB_unique" ON "_CreatorToSocialConnection"("A", "B");

-- CreateIndex
CREATE INDEX "_CreatorToSocialConnection_B_index" ON "_CreatorToSocialConnection"("B");

-- AddForeignKey
ALTER TABLE "SocialConnection" ADD CONSTRAINT "SocialConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorToSocialConnection" ADD CONSTRAINT "_CreatorToSocialConnection_A_fkey" FOREIGN KEY ("A") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorToSocialConnection" ADD CONSTRAINT "_CreatorToSocialConnection_B_fkey" FOREIGN KEY ("B") REFERENCES "SocialConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
