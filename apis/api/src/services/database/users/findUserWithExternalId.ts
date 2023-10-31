import { PrismaTransactionClient } from '../types/types'
import { ExternalUserWithRelations } from './types/userTypeExtensions'
import normalizeString from '../../../utilities/normalizeString'

const findUserWithExternalId = async (
  prisma: PrismaTransactionClient,
  externalUserId: string,
): Promise<ExternalUserWithRelations | null> => {
  return await prisma.externalUser.findUnique({
    where: { externalUserId: normalizeString(externalUserId) },
    include: {
      user: {
        include: {
          addresses: {
            include: {
              address: true,
            },
          },
          phoneNumbers: true,
          settings: true,
          userRoles: {
            include: {
              company: true,
              role: true,
            },
          },
        },
      },
    },
  })
}

export default findUserWithExternalId
