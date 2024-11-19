/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passcode` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "passcode" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "School_email_key" ON "School"("email");
