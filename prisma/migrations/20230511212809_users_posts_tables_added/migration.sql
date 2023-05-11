-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "ig_id" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "media_product_type" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "permalink" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "comments_count" INTEGER NOT NULL,
    "like_count" INTEGER NOT NULL,
    "followers_count" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "post_ig_id_key" ON "post"("ig_id");
