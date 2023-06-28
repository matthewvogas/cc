/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_campaign_id_fkey";

-- DropTable
DROP TABLE "post";

-- CreateTable
CREATE TABLE "hashtags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ig_id" TEXT NOT NULL,
    "campaign_id" INTEGER,

    CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "ig_id" TEXT NOT NULL,
    "campaign_id" INTEGER NOT NULL,
    "caption" TEXT,
    "media_product_type" TEXT,
    "media_type" TEXT,
    "permalink" TEXT,
    "shortcode" TEXT,
    "video_url" TEXT,
    "image_url" TEXT,
    "comments_count" INTEGER,
    "likes_count" INTEGER,
    "followers_count" INTEGER,
    "username" TEXT,
    "engagement_count" INTEGER,
    "impressions_count" INTEGER,
    "reach_count" INTEGER,
    "saves_count" INTEGER,
    "shares_count" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_name_key" ON "hashtags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_ig_id_key" ON "hashtags"("ig_id");

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_campaign_id_key" ON "hashtags"("campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_ig_id_key" ON "posts"("ig_id");

-- AddForeignKey
ALTER TABLE "hashtags" ADD CONSTRAINT "hashtags_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
