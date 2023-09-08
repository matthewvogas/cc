-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('AGENCY', 'CREATOR', 'CLIENT');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'AGENCY';
