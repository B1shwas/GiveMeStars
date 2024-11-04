/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rating_id` on the `Rating` table. All the data in the column will be lost.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `review_id` on the `Review` table. All the data in the column will be lost.
  - The primary key for the `School` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `school_id` on the `School` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teacher_id` on the `Teacher` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Rating` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Review` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `School` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Teacher` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_user_id_fkey";

-- DropIndex
DROP INDEX "Rating_rating_id_key";

-- DropIndex
DROP INDEX "Review_review_id_key";

-- DropIndex
DROP INDEX "School_school_id_key";

-- DropIndex
DROP INDEX "Student_student_id_key";

-- DropIndex
DROP INDEX "Teacher_teacher_id_key";

-- DropIndex
DROP INDEX "User_user_id_key";

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
DROP COLUMN "rating_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "review_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "School" DROP CONSTRAINT "School_pkey",
DROP COLUMN "school_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "School_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "student_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_pkey",
DROP COLUMN "teacher_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_id_key" ON "Rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "School_id_key" ON "School"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_id_key" ON "Teacher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
