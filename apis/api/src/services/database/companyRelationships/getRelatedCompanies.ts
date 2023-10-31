import { Prisma, PrismaClient } from '../../../../prisma/client'
import { RelatedCompanyWithRelations } from './types/companyRelationshipTypeExtensions'
import { FieldFilter, TagFilter } from '../types/types'
import { CompanyRelationshipTypeEnum } from '../../../types'

export interface GetCompaniesWithRelationshipInput {
  companyId: string
  relationshipType: CompanyRelationshipTypeEnum
  page?: number
  perPage?: number
  searchTerm?: string
  sort?: string
  filters?: FieldFilter[]
  tagFilters?: TagFilter[]
}

const getRelatedCompanies = async (
  prisma: PrismaClient,
  input: GetCompaniesWithRelationshipInput,
): Promise<{
  relatedCompanies: RelatedCompanyWithRelations[]
  totalCount: number
} | null> => {
  const {
    companyId,
    relationshipType,
    page,
    perPage,
    searchTerm,
    sort,
    filters,
    tagFilters,
  } = input

  const where: Prisma.RelatedCompanyWhereInput = {
    firstCompanyId: companyId,
    companyRelationshipType: {
      companyRelationshipTypeName: relationshipType.toLowerCase(),
    },
    secondCompany: {},
  }

  if (searchTerm) {
    // Check if keyword is an email
    const isEmail = searchTerm.includes('@')

    if (isEmail) {
      // Only search user emails if the keyword is an email
      where.secondCompany.roles = {
        some: {
          AND: [
            { user: { email: { contains: searchTerm, mode: 'insensitive' } } },
            { role: { roleName: { equals: 'Contact' } } },
          ],
        },
      }
    } else {
      // Search customer company names and usernames if the keyword is not an email
      where.secondCompany = {
        OR: [
          { companyName: { contains: searchTerm, mode: 'insensitive' } },
          {
            roles: {
              some: {
                AND: [
                  {
                    user: {
                      email: { contains: searchTerm, mode: 'insensitive' },
                    },
                  },
                  { role: { roleName: { equals: 'Contact' } } },
                ],
              },
            },
          },
        ],
      }
    }
  }

  // Handle filters
  filters?.forEach(filter => {
    if (filter.filterValues && filter.filterValues.length > 0) {
      where[filter.filterField] = { in: filter.filterValues }
    }
  })

  if (tagFilters?.length) {
    const tags = await Promise.all(
      tagFilters.map(async tagFilter => {
        const tag = await prisma.tag.findFirst({
          where: {
            tagName: tagFilter.tagName,
            tagCategory: {
              tagCategoryName: tagFilter.tagCategoryName,
            },
          },
        })
        return tag // returns undefined if no tag is found
      }),
    )

    // Filter out undefined tags
    const validTags = tags.filter(tag => tag !== undefined)

    if (validTags?.length) {
      where.AND = validTags.map(tag => ({
        companyRelationship: {
          companyRelationshipTags: {
            some: {
              tagId: tag.id,
            },
          },
        },
      }))
    }
  }

  const skip = page * perPage

  const orderBy: Prisma.RelatedCompanyOrderByWithRelationInput = {}

  if (sort) {
    const [sortField, sortOrder] = sort.split(':')

    switch (sortField) {
      case 'companyName':
        orderBy.secondCompany = { companyName: sortOrder as Prisma.SortOrder }
        break
      case 'companyType':
        orderBy.secondCompany = {
          companyType: { companyTypeName: sortOrder as Prisma.SortOrder },
        }
        break
      case 'companyRelationshipStatus':
        orderBy.companyRelationship = {
          companyRelationshipStatus: sortOrder as Prisma.SortOrder,
        }
        break
      case 'companyRelationshipType':
        orderBy.companyRelationshipType = {
          companyRelationshipTypeName: sortOrder as Prisma.SortOrder,
        }
        break
      case 'createdAt':
        orderBy.companyRelationship = {
          createdAt: sortOrder as Prisma.SortOrder,
        }
        break
      case 'updatedAt':
        orderBy.companyRelationship = {
          updatedAt: sortOrder as Prisma.SortOrder,
        }
        break
      default:
      // handle default or throw error
    }
  }

  const relatedCompanies = await prisma.relatedCompany.findMany({
    where: where,
    orderBy,
    take: perPage,
    skip,
    include: {
      companyRelationship: {
        include: {
          companyRelationshipTags: {
            include: {
              tag: {
                include: {
                  tagCategory: true,
                },
              },
            },
          },
        },
      },
      companyRelationshipType: true,
      secondCompany: {
        include: {
          companyType: true,
          addresses: {
            include: {
              address: true,
            },
          },
          companyTags: {
            include: {
              tag: {
                include: {
                  tagCategory: true,
                },
              },
            },
          },
          phoneNumbers: true,
          roles: {
            where: { role: { roleName: { equals: 'Contact' } } },
            include: {
              user: true,
              role: true,
            },
          },
        },
      },
    },
  })

  const totalCount = await prisma.relatedCompany.count({
    where: where,
  })

  const companyRelationships = relatedCompanies.map(
    relatedCompany => relatedCompany.companyRelationship,
  )

  return { relatedCompanies, totalCount }
}

export default getRelatedCompanies
