-- CreateTable
CREATE TABLE "AccessConnection" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "email" TEXT,

    CONSTRAINT "AccessConnection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccessConnection" ADD CONSTRAINT "AccessConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
