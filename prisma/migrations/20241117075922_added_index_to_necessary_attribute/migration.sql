/*
  Warnings:

  - You are about to drop the `_User Roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_User Roles" DROP CONSTRAINT "_User Roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_User Roles" DROP CONSTRAINT "_User Roles_B_fkey";

-- DropTable
DROP TABLE "_User Roles";

-- CreateTable
CREATE TABLE "_User  Roles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_User  Roles_AB_unique" ON "_User  Roles"("A", "B");

-- CreateIndex
CREATE INDEX "_User  Roles_B_index" ON "_User  Roles"("B");

-- CreateIndex
CREATE INDEX "Feedback_teacherId_idx" ON "Feedback"("teacherId");

-- CreateIndex
CREATE INDEX "Feedback_studentId_idx" ON "Feedback"("studentId");

-- CreateIndex
CREATE INDEX "Feedback_userId_idx" ON "Feedback"("userId");

-- CreateIndex
CREATE INDEX "Role_name_idx" ON "Role"("name");

-- CreateIndex
CREATE INDEX "School_name_idx" ON "School"("name");

-- CreateIndex
CREATE INDEX "Student_userId_idx" ON "Student"("userId");

-- CreateIndex
CREATE INDEX "Student_schoolId_idx" ON "Student"("schoolId");

-- CreateIndex
CREATE INDEX "Teacher_userId_idx" ON "Teacher"("userId");

-- CreateIndex
CREATE INDEX "Teacher_schoolId_idx" ON "Teacher"("schoolId");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "_User  Roles" ADD CONSTRAINT "_User  Roles_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User  Roles" ADD CONSTRAINT "_User  Roles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
