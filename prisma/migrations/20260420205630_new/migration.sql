-- CreateTable
CREATE TABLE "passphrase" (
    "id" SERIAL NOT NULL,
    "phrase" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passphrase_pkey" PRIMARY KEY ("id")
);
