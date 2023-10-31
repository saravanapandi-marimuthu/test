import { PrismaClient, Role } from '../../../../prisma/client'

const getAvailableRoles = async (
  prisma: PrismaClient,
  includeSuperAdmin: boolean,
): Promise<Role[] | null> => {
  if (includeSuperAdmin) {
    return prisma.role.findMany()
  }

  return prisma.role.findMany({
    where: {
      roleName: {
        not: 'Super Admin',
      },
    },
  })
}

export default getAvailableRoles
