-- AlterTable
ALTER TABLE "stories" ADD COLUMN     "follows" INTEGER,
ADD COLUMN     "impressions" INTEGER,
ADD COLUMN     "permalink" TEXT,
ADD COLUMN     "profile_activity" INTEGER,
ADD COLUMN     "profile_visits" INTEGER,
ADD COLUMN     "reach" INTEGER,
ADD COLUMN     "replies" INTEGER,
ADD COLUMN     "shares" INTEGER,
ADD COLUMN     "swipeForward" INTEGER,
ADD COLUMN     "tapBack" INTEGER,
ADD COLUMN     "tapExit" INTEGER,
ADD COLUMN     "tapForward" INTEGER,
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "hashtag" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "hashtag" TEXT,
    "story_id" INTEGER,
    "post_id" INTEGER,

    CONSTRAINT "hashtag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hashtag" ADD CONSTRAINT "hashtag_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hashtag" ADD CONSTRAINT "hashtag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
