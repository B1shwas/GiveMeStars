type UserRole = "STUDENT" | "TEACHER";

export const createRoleEntry = async (
  prisma: any,
  role: UserRole,
  userId: string
) => {
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error(`User with ID ${userId} does not exist.`);
  }
  const roleCreationMap = {
    STUDENT: async () => {
      await prisma.student.create({
        data: {
          userId,
        },
      });
    },
    TEACHER: async () => {
      await prisma.teacher.create({
        data: {
          userId,
        },
      });
    },
  };

  const createRole = roleCreationMap[role];
  if (createRole) {
    await createRole();
  } else {
    throw new Error("Invalid role");
  }
};
