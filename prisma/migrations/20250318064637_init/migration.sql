-- CreateEnum
CREATE TYPE "ProfessionalType" AS ENUM ('LAWYER', 'TAX_ACCOUNTANT', 'CPA', 'JUDICIAL_SCRIVENER', 'ADMINISTRATIVE_SCRIVENER', 'LABOR_CONSULTANT', 'PATENT_ATTORNEY', 'REAL_ESTATE_APPRAISER', 'LAND_SURVEYOR', 'SME_CONSULTANT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "professionalType" "ProfessionalType" NOT NULL,
    "yearOfExperience" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
