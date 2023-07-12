/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `creators` will be added. If there are existing duplicate values, this will fail.
  - Made the column `uuid` on table `creators` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "creators" ALTER COLUMN "uuid" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CreatorToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CreatorToUser_AB_unique" ON "_CreatorToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CreatorToUser_B_index" ON "_CreatorToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "creators_uuid_key" ON "creators"("uuid");

-- AddForeignKey
ALTER TABLE "_CreatorToUser" ADD CONSTRAINT "_CreatorToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorToUser" ADD CONSTRAINT "_CreatorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
