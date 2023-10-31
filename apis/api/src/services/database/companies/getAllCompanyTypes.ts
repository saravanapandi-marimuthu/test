import { CompanyType, PrismaClient } from '../../../../prisma/client'

const getAllCompanyTypes = async (
  prisma: PrismaClient,
): Promise<CompanyType[]> => {
  return prisma.companyType.findMany()
}

export default getAllCompanyTypes
