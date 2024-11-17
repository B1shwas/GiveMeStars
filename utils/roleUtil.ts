export const createRoleEntry = async (
  prisma: any,
  roleCode: string,
  userId: string
) => {
  const roleCreationMap: Record<string, () => Promise<void>> = {
    "0110": async () => {
      await prisma.student.create({
        data: {
          userId,
        },
      });
    },
    "1799": async () => {
      await prisma.teacher.create({
        data: {
          userId,
        },
      });
    },
  };

  const createRole = roleCreationMap[roleCode];
  if (createRole) {
    await createRole();
  } else {
    return;
  }
};
