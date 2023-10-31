import { PrismaClient } from '../../../../prisma/client'
import { UserRoleWithRelations } from './types/userTypeExtensions'

const findUserRoleWithUserRoleId = async (
  prisma: PrismaClient,
  userRoleId: string,
): Promise<UserRoleWithRelations | null> => {
  return await prisma.userRole.findUnique({
    where: { id: userRoleId },
    include: {
      company: true,
      role: true,
    },
  })
}

export default findUserRoleWithUserRoleId
