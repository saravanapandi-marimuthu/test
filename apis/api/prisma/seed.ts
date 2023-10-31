import defaultCompanyTypes, { CompanyTypes } from './seeds/defaultCompanyTypes'
import {
  Company,
  CompanyRelationshipType,
  CompanyType,
  PaymentTerm,
  PrismaClient,
} from './client'
import defaultSystemRoles from './seeds/defaultSystemRoles'
import findOrCreateUserWithExternalId from '../src/services/database/users/findOrCreateUserWithExternalId'
import { RoleName } from '../src/models/RoleName'
import defaultPaymentTerms from './seeds/defaultPaymentTerms'
import findUserWithExternalId from '../src/services/database/users/findUserWithExternalId'
import { defaultTags } from './seeds/defaultTags'
import findOrCreateTag from '../src/services/database/configurations/tags/findOrCreateTag'
import findOrCreateUnitOfMeasurement from '../src/services/database/configurations/uom/findOrCreateUnitOfMeasurement'
import { defaultUnits } from './seeds/defaultUnits'
import { externalUsers } from './externalUsers'
import createTagCategory from '../src/services/database/configurations/tagCategory/createTagCategory'
import createCompany from '../src/services/database/companies/createCompany'
import createRelatedCompany from '../src/services/database/companyRelationships/createRelatedCompany'
import getCompany from '../src/services/database/companies/getCompany'
import { CreateRelatedCompanyInput } from '../src/services/database/companyRelationships/types/companyRelationshipTypeExtensions'
import { defaultTaxonomies } from './seeds/defaultTaxonomies'
import { SYSTEM_COMPANY_ID } from '../src/constants'
import createTaxonomy from '../src/services/database/configurations/taxonomies/createTaxonomy'
import getTaxonomyTree from '../src/services/database/configurations/taxonomies/getTaxonomyTree'
import getParentTaxonomyTree from '../src/services/database/configurations/taxonomies/getParentTaxonomyTree'
import labsCatalog from './seeds/labsCatalog'
import { CreateCompanyInput } from '../src/services/database/companies/types/companyTypeExtensions'
import {
  CompanyRelationshipTypeEnum,
  CompanyTypeEnum,
  companyRelationshipTypeDisplayNames,
  companyTypeDisplayNames,
} from '../src/types'
import { getEnumValues } from '../src/utilities/enumUtility'
import { sampleCustomers, sampleFarms } from './seeds/sampleCustomers'
import normalizeString from '../src/utilities/normalizeString'

const companyNames = [
  'Horizen Ag inc.',
  'AgHub Midwest',
  'Central Plains Agronomy',
]

const prisma = new PrismaClient()

const seedRoles = async (): Promise<void> => {
  for (const roleData of defaultSystemRoles) {
    try {
      const role = await prisma.role.upsert({
        where: {
          roleName: roleData.name,
        },
        update: {
          description: roleData.description,
          updatedAt: new Date(),
        },
        create: {
          roleName: roleData.name,
          description: roleData.description,
        },
      })

      console.log('seedRoles result', role)
    } catch (error) {
      console.log('seedRoles error', error)
    }
  }
}

const seedUserRole = async (company: Company, roleName: RoleName) => {
  for (const extUser of externalUsers) {
    try {
      const user = await findOrCreateUserWithExternalId(prisma, {
        externalUserId: extUser.id,
        email: extUser.email,
        companyId: company.id,
        roleName: roleName,
      })

      console.log('seedUserRole result', user)
    } catch (error) {
      console.log('seedUserRole error', error)
    }
  }
}

const seedPaymentTerms = async () => {
  for (const term of defaultPaymentTerms) {
    try {
      let paymentTerm = await prisma.paymentTerm.findFirst({
        where: { normalizedPaymentTerm: term.termType },
      })

      if (!paymentTerm) {
        console.log("Payment term doesn't exist. Creating...")

        const newPaymentTerm = {
          paymentTerm: term.termType,
          normalizedPaymentTerm: term.termType.toLowerCase(),
          description: term.description,
          dueDays: term.dueDays ?? 0,
        } as any as PaymentTerm

        paymentTerm = await prisma.paymentTerm.create({ data: newPaymentTerm })
      }
    } catch (error) {
      console.log('seedPaymentTerms error', error)
    }
  }
}

const seedCompanyType = async () => {
  const companyTypeKeys = getEnumValues(CompanyTypeEnum)

  for (const compTypeName of companyTypeKeys) {
    try {
      let companyType = await prisma.companyType.findFirst({
        where: { companyTypeName: compTypeName.toString() },
      })

      if (!companyType) {
        console.log("Company type doesn't exist. Creating...")
        companyType = {
          companyTypeName: compTypeName.toString().toLowerCase(),
          displayName: companyTypeDisplayNames.get(
            compTypeName as CompanyTypeEnum,
          ),
        } as CompanyType

        companyType = await prisma.companyType.create({ data: companyType })
      }
    } catch (error) {
      console.log('seedCompanyType error', error)
    }
  }
}

const seedCompanyRelationshipType = async () => {
  const companyRelationshipTypeKeys = getEnumValues(CompanyRelationshipTypeEnum)

  for (const companyRelationshipType of companyRelationshipTypeKeys) {
    try {
      let relationshipType = await prisma.companyRelationshipType.findFirst({
        where: {
          companyRelationshipTypeName: companyRelationshipType.toString(),
        },
      })

      if (!relationshipType) {
        console.log("Company relationship type doesn't exist. Creating...")
        relationshipType = {
          companyRelationshipTypeName: companyRelationshipType
            .toString()
            .toLowerCase(),
          displayName: companyRelationshipTypeDisplayNames.get(
            companyRelationshipType as CompanyRelationshipTypeEnum,
          ),
        } as CompanyRelationshipType

        relationshipType = await prisma.companyRelationshipType.create({
          data: relationshipType,
        })
      }
    } catch (error) {
      console.log('seedCompanyType error', error)
    }
  }
}

const seedCompany = async (
  companyName: string,
  companyTypeName: string,
  companyId?: string | undefined,
) => {
  const existingCompany = await getCompany(prisma, undefined, companyName)

  if (existingCompany) {
    return existingCompany
  }

  const company = await createCompany(prisma, '', {
    companyName,
    companyTypeName,
    companyId,
  })

  return company
}

const seedLabsCatalog = async () => {
  for (const lab of labsCatalog) {
    if (!lab.contactPerson.email) {
      continue
    }

    try {
      const data: CreateCompanyInput = {
        companyName: lab.companyName,
        companyTypeName: CompanyTypeEnum.SERVICE_PROVIDER,
        companyAddress: lab.address,
        companyPhoneNumber: lab.phoneNumber,
        contactPerson: lab.contactPerson,
      }

      await createCompany(prisma, '', data)
    } catch (error) {
      console.log('seedLabsCatalog error', error)
    }
  }
}

const seedCustomers = async (providerCompany: Company) => {
  const user = await findUserWithExternalId(prisma, externalUsers[0].id)

  for (const customer of sampleCustomers) {
    try {
      const data: CreateRelatedCompanyInput = {
        providerCompanyId: providerCompany.id,
        companyName: customer.companyName,
        companyTypeName: CompanyTypes.ACCOUNT,
        companyAddress: customer.address,
        companyPhoneNumber: customer.phoneNumber,
        contactPerson: customer.contactPerson,
        companyRelationshipTags: customer.tags,
        companyExtendedProperties: customer.extendedProperties,
        companyRelationshipType: CompanyRelationshipTypeEnum.CUSTOMER_ACCOUNT,
      }

      await createRelatedCompany(prisma, user.userId, data)
    } catch (error) {
      console.log('seedCustomers error', error)
    }
  }
}

const seedFarms = async (providerCompany: Company) => {
  const user = await findUserWithExternalId(prisma, externalUsers[0].id)

  for (const customer of sampleFarms) {
    try {
      const data: CreateRelatedCompanyInput = {
        providerCompanyId: providerCompany.id,
        companyName: customer.companyName,
        companyTypeName: CompanyTypes.ENTERPRISE,
        companyAddress: customer.address,
        companyPhoneNumber: customer.phoneNumber,
        contactPerson: customer.contactPerson,
        companyRelationshipTags: customer.tags,
        companyExtendedProperties: customer.extendedProperties,
        companyRelationshipType:
          CompanyRelationshipTypeEnum.ENTERPRISE_SERVICE_RETAILER,
      }

      await createRelatedCompany(prisma, user.userId, data)
    } catch (error) {
      console.log('seedCustomers error', error)
    }
  }
}

const seedTags = async updatedByUserId => {
  const maxColors: number = 15
  let currentTagCategoryColor: number = 0

  for (const tagCategory of defaultTags) {
    console.log(tagCategory)

    try {
      let newTagCategory = await createTagCategory(prisma, updatedByUserId, {
        tagCategoryName: tagCategory.tagCategoryName,
        colorIndex: currentTagCategoryColor,
      })

      console.log(
        `${newTagCategory.id}: ${newTagCategory.tagCategoryName} created`,
      )
    } catch (error) {
      console.log('seedTags error', error)
    }

    let currentTagColor: number = 0

    for (const tagName of tagCategory.tagNames) {
      console.log(tagName)

      try {
        let newTag = await findOrCreateTag(prisma, updatedByUserId, {
          tagCategoryName: tagCategory.tagCategoryName,
          tagName: tagName.toString(),
          colorIndex: currentTagColor,
        })

        console.log(`${newTag.id}: ${newTag.tagName} created`)
      } catch (error) {
        console.log('seedTags error', error)
      }

      currentTagColor = (currentTagColor + 1) % maxColors
    }

    currentTagCategoryColor = (currentTagCategoryColor + 1) % maxColors
  }
}

const seedUnitOfMeasurements = async updatedByUserId => {
  for (const unit of defaultUnits) {
    try {
      let newUom = await findOrCreateUnitOfMeasurement(
        prisma,
        updatedByUserId,
        {
          unitName: unit.unitName,
          singularName: unit.singularName,
          pluralName: unit.pluralName,
          baseUnitName: unit.baseUnitName,
          conversionFactor: unit.conversionFactor,
          numeratorUnitName: unit.numeratorUnitName,
          numeratorMultiplier: unit.numeratorMultiplier,
          numeratorUnitType: unit.numeratorUnitType,
          denominatorUnitName: unit.denominatorUnitName,
          denominatorMultiplier: unit.denominatorMultiplier,
          denominatorUnitType: unit.denominatorUnitType,
          colorIndex: unit.colorIndex,
          unitOfMeasurementType: unit.unitOfMeasurementType,
        },
      )

      console.log(`${newUom.unitName} created`)
    } catch (error) {
      console.log('seedUnitOfMeasurements error', error)
    }
  }
}

const seedTaxonomy = async updatedByUserId => {
  for (const taxonomy of defaultTaxonomies) {
    try {
      await createTaxonomy(prisma, updatedByUserId, taxonomy)
    } catch (error) {
      console.log('seedTaxonomy error', error)
    }
  }
}

;(async () => {
  try {
    await seedPaymentTerms()
    console.log('Seed Roles completed')

    await seedTags(undefined)
    console.log('Seed tags completed')

    await seedUnitOfMeasurements(undefined)
    console.log('Seed unit of measurement completed')

    await seedCompanyType()
    console.log('Seed company type completed')

    await seedCompanyRelationshipType()
    console.log('Seed company relationship type completed')

    await seedRoles()
    console.log('Seed Roles completed')

    // Seed System / SaaS Company
    let company = await seedCompany(
      companyNames[0],
      CompanyTypeEnum.SYSTEM,
      SYSTEM_COMPANY_ID,
    )
    console.log(`Seed Company completed ${company.id} - ${company.companyName}`)

    await seedUserRole(company, RoleName.SuperAdmin)
    console.log(`Seed ${RoleName.SuperAdmin} completed`)

    company = await seedCompany(companyNames[1], CompanyTypeEnum.AG_RETAILER)
    await seedUserRole(company, RoleName.SalesManager)
    console.log(`Seed ${RoleName.SalesManager} completed`)

    await seedCustomers(company)
    console.log('Seed Customers completed')

    await seedFarms(company)
    console.log('Seed Farms completed')

    company = await seedCompany(companyNames[2], CompanyTypeEnum.AG_RETAILER)
    await seedUserRole(company, RoleName.SalesManager)
    console.log(`Seed ${RoleName.SalesManager} completed`)

    await seedCustomers(company)
    console.log('Seed Customers completed')

    await seedFarms(company)
    console.log('Seed Farms completed')

    await seedLabsCatalog()
    console.log('Seed labs catalog completed')
  } catch (error) {
    console.error('Error running seed script:', error)
  } finally {
    await prisma.$disconnect()
  }
})()
