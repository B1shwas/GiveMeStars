/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,studentId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,studentId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_teacherId_studentId_key" ON "Rating"("teacherId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_teacherId_studentId_key" ON "Review"("teacherId", "studentId");
