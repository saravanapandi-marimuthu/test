import { PrismaClient, Product } from '../../../../prisma/client'

const getManufacturerProducts = async (
  prisma: PrismaClient,
  manufacturerId: string,
  page: number,
  perPage: number,
  searchTerm: string,
  sort: string,
): Promise<{
  products: Product[]
  totalCount: number
} | null> => {
  // Build the 'where' filter for search functionality
  let where: any = {}

  if (searchTerm) {
    where.AND = [
      {
        OR: [
          { productName: { contains: searchTerm, mode: 'insensitive' } },
          { commonName: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
    ]
  }

  if (manufacturerId) {
    const manufacturerCondition = { manufacturerId: { equals: manufacturerId } }

    if (where.AND) {
      where.AND.push(manufacturerCondition)
    } else {
      where = { AND: [manufacturerCondition] }
    }
  }

  // Parse the 'sort' string and convert it to an object for Prisma
  const orderBy = sort
    ? {
        [sort.split(':')[0]]: sort.split(':')[1],
      }
    : {}

  const products = await prisma.product.findMany({
    skip: page * perPage,
    take: perPage,
    where: where,
    orderBy: orderBy,
    include: {
      manufacturer: {
        select: {
          companyName: true,
          homepage: true,
        },
      },
    },
  })

  const totalCount = await prisma.product.count({ where })

  return {
    products: products,
    totalCount,
  }
}

export default getManufacturerProducts
