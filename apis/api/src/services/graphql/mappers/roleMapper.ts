import { Role as PrismaRole } from '../../../../prisma/client'
import { Role } from '../generated/graphql'

export const mapPrismaRolesToGraphqlRoles = async (
  prismaRoles: PrismaRole[],
): Promise<Role[]> => {
  return prismaRoles.map(prismaRole => {
    return {
      id: prismaRole.id,
      roleName: prismaRole.roleName,
      description: prismaRole.description,
      permissions: [],
      createdAt: prismaRole.createdAt,
      updatedAt: prismaRole.updatedAt,
    }
  })
}
