-- CreateTable
CREATE TABLE "Password" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "Length" INTEGER NOT NULL DEFAULT 4,
    "hasUppercase" BOOLEAN NOT NULL DEFAULT false,
    "hasLowercase" BOOLEAN NOT NULL DEFAULT false,
    "hasNumbers" BOOLEAN NOT NULL DEFAULT false,
    "hasSymbols" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);
