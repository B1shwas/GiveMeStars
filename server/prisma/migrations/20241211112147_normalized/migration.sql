/*
  Warnings:

  - You are about to drop the column `studentId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `passcode` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_User  Roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[giverId,receiverId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactId]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `giverId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactId` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "teacher_school_relation";

-- DropForeignKey
ALTER TABLE "_User  Roles" DROP CONSTRAINT "_User  Roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_User  Roles" DROP CONSTRAINT "_User  Roles_B_fkey";

-- DropIndex
DROP INDEX "Feedback_studentId_idx";

-- DropIndex
DROP INDEX "Feedback_teacherId_idx";

-- DropIndex
DROP INDEX "Feedback_teacherId_studentId_userId_key";

-- DropIndex
DROP INDEX "Feedback_userId_idx";

-- DropIndex
DROP INDEX "School_email_key";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "studentId",
DROP COLUMN "teacherId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "giverId" TEXT NOT NULL,
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "email",
DROP COLUMN "passcode",
DROP COLUMN "phone",
DROP COLUMN "pincode",
DROP COLUMN "state",
ADD COLUMN     "contactId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken",
ADD COLUMN     "contactId" TEXT,
ADD COLUMN     "roles" INTEGER[],
ADD COLUMN     "schoolId" TEXT;

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "_User  Roles";

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pincode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Pincode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserContact" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pincodeId" TEXT,

    CONSTRAINT "UserContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolContact" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pincodeId" TEXT NOT NULL,

    CONSTRAINT "SchoolContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserSchools" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "State_id_key" ON "State"("id");

-- CreateIndex
CREATE UNIQUE INDEX "State_code_countryId_key" ON "State"("code", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_stateId_key" ON "City"("name", "stateId");

-- CreateIndex
CREATE UNIQUE INDEX "Pincode_id_key" ON "Pincode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pincode_code_cityId_key" ON "Pincode"("code", "cityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserContact_id_key" ON "UserContact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolContact_id_key" ON "SchoolContact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolContact_email_key" ON "SchoolContact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_token_idx" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSchools_AB_unique" ON "_UserSchools"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSchools_B_index" ON "_UserSchools"("B");

-- CreateIndex
CREATE INDEX "Feedback_giverId_idx" ON "Feedback"("giverId");

-- CreateIndex
CREATE INDEX "Feedback_receiverId_idx" ON "Feedback"("receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_giverId_receiverId_key" ON "Feedback"("giverId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "School_contactId_key" ON "School"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactId_key" ON "User"("contactId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "UserContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pincode" ADD CONSTRAINT "Pincode_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContact" ADD CONSTRAINT "UserContact_pincodeId_fkey" FOREIGN KEY ("pincodeId") REFERENCES "Pincode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "SchoolContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolContact" ADD CONSTRAINT "SchoolContact_pincodeId_fkey" FOREIGN KEY ("pincodeId") REFERENCES "Pincode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSchools" ADD CONSTRAINT "_UserSchools_A_fkey" FOREIGN KEY ("A") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSchools" ADD CONSTRAINT "_UserSchools_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
