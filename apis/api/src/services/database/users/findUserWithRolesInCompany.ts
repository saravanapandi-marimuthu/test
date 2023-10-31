import { PrismaClient } from '../../../../prisma/client'
import { UserWithRelations } from './types/userTypeExtensions'

const findUserWithRolesInCompany = async (
  prisma: PrismaClient,
  userId: string,
  companyId: string,
): Promise<UserWithRelations | null> => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      addresses: {
        include: {
          address: true,
        },
      },
      phoneNumbers: true,
      settings: true,
      userRoles: {
        where: {
          OR: [
            {
              company: {
                id: companyId,
              },
            },
            {
              company: {
                parentCompanyId: companyId,
              },
            },
          ],
        },
        include: {
          company: true,
          role: true,
        },
      },
    },
  })
}

export default findUserWithRolesInCompany
