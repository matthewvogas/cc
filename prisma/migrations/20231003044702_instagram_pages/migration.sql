-- CreateTable
CREATE TABLE "instagramPages" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_picture_url" TEXT NOT NULL,
    "followers_count" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,

    CONSTRAINT "instagramPages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "instagramPages" ADD CONSTRAINT "instagramPages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
