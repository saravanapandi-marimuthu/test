import { PrismaClient, UserRole } from '../../../../prisma/client'

export const addUserRole = async (
  prisma: PrismaClient,
  userId: string,
  roleId: number,
  companyId: string,
) => {
  let existingRole = await prisma.userRole.findFirst({
    where: { userId, roleId, companyId },
  })

  if (existingRole) {
    return existingRole
  }

  existingRole = {
    userId,
    roleId,
    companyId,
  } as UserRole

  return prisma.userRole.create({ data: existingRole })
}

export const removeUserRole = async (
  prisma: PrismaClient,
  userId: string,
  roleId: number,
  companyId: string,
) => {
  let existingRole = await prisma.userRole.findFirst({
    where: { userId, roleId, companyId },
  })

  if (!existingRole) {
    return false
  }

  const result = await prisma.userRole.delete({
    where: {
      userId_roleId_companyId: {
        userId,
        roleId,
        companyId,
      },
    },
  })

  console.log(`UserRole deleted: ${JSON.stringify(result)}`)

  return true
}
