import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers(
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
    $filters: [FilterInput]
  ) {
    getUsers(
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
      filters: $filters
    ) {
      users {
        id
        email
        displayName
        firstName
        middleName
        lastName
        createdAt
        roleCount
        addresses {
          addressId
          addressType
          address {
            id
            addressLine1
            addressLine2
            city
            country
            state
            postalCode
          }
        }
        phoneNumbers {
          phoneNumberType
          phoneNumber
        }
        userRoles {
          id
          roleId
          companyId
          role {
            id
            roleName
          }
          company {
            id
            companyName
          }
        }
        settings {
          avatarUrl
        }
      }
      totalCount
    }
  }
`

export const GET_USER_OR_CREATE = gql`
  query GetUserOrCreate {
    getUserOrCreate {
      id
      email
      displayName
      firstName
      middleName
      lastName
      createdAt
      roleCount
      addresses {
        addressId
        addressType
        address {
          addressLine1
          addressLine2
          city
          country
          state
          postalCode
        }
      }
      phoneNumbers {
        phoneNumberType
        phoneNumber
      }
      userRoles {
        id
        roleId
        companyId
        role {
          id
          roleName
        }
        company {
          id
          companyName
        }
      }
      settings {
        selectedUserRoleId
        additionalSettings
        avatarFallbackImage
        avatarUrl
        darkMode
      }
    }
  }
`

export const GET_USER_BY_USER_ID = gql`
  query GetUserByUserId($userId: String!) {
    getUserByUserId(userId: $userId) {
      id
      email
      displayName
      firstName
      middleName
      lastName
      createdAt
      roleCount
      addresses {
        addressId
        addressType
        address {
          addressLine1
          addressLine2
          city
          country
          state
          postalCode
        }
      }
      phoneNumbers {
        phoneNumberType
        phoneNumber
      }
      userRoles {
        id
        roleId
        companyId
        role {
          id
          roleName
        }
        company {
          id
          companyName
        }
      }
      settings {
        selectedUserRoleId
        additionalSettings
        avatarFallbackImage
        avatarUrl
        darkMode
      }
    }
  }
`

export const GET_USER_ROLES = gql`
  query GetUserRoles($userId: ID!) {
    getUserRoles(userId: $userId) {
      companyId
      companyName
      roleId
    }
  }
`

export const GET_AVAILABLE_ROLES = gql`
  query GetAvailableRoles {
    getAvailableRoles {
      id
      roleName
      description
    }
  }
`

export const GET_CUSTOMERS = gql`
  query GetCustomers(
    $companyId: String!
    $relationshipType: CompanyRelationshipType!
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
    $filters: [FilterInput]
    $tagFilters: [TagFilterInput]
  ) {
    getCustomers(
      companyId: $companyId
      relationshipType: $relationshipType
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
      filters: $filters
      tagFilters: $tagFilters
    ) {
      customers {
        companyId
        customerCompanyId
        extendedProperties
        companyRelationshipTags {
          tag {
            color
            icon
            tagName
            tagCategory {
              color
              icon
              tagCategoryName
            }
          }
        }
        companyRelationshipTags {
          tag {
            icon
            color
            tagName
          }
          tagCategory {
            icon
            color
            tagCategoryName
          }
        }
        customerCompany {
          companyName
          companyType {
            companyTypeName
          }
          roles {
            user {
              displayName
              email
              firstName
              middleName
              lastName
              addresses {
                addressType
                address {
                  addressLine1
                  addressLine2
                  city
                  country
                  postalCode
                  state
                }
              }
              phoneNumbers {
                phoneNumberType
                phoneNumber
              }
              settings {
                avatarUrl
              }
            }
            role {
              roleName
            }
          }
          addresses {
            addressType
            address {
              addressLine1
              addressLine2
              city
              country
              postalCode
              state
            }
          }
          phoneNumbers {
            phoneNumberType
            phoneNumber
          }
        }
      }
      totalCount
    }
  }
`

export const GET_CUSTOMER = gql`
  query GetCustomer(
    $providerCompanyId: String!
    $customerCompanyId: String!
    $companyRelationshipType: CompanyRelationshipType!
  ) {
    getCustomer(
      providerCompanyId: $providerCompanyId
      customerCompanyId: $customerCompanyId
      companyRelationshipType: $companyRelationshipType
    ) {
      customer {
        companyId
        customerCompanyId
        extendedProperties
        customerCompany {
          id
          companyType {
            companyTypeName
          }
          companyName
          addresses {
            addressType
            address {
              addressLine1
              addressLine2
              city
              country
              postalCode
              state
            }
          }
          phoneNumbers {
            phoneNumberType
            phoneNumber
          }
          roles {
            user {
              email
              firstName
              lastName
              middleName
              settings {
                avatarUrl
              }
            }
            role {
              roleName
            }
          }
        }
      }
    }
  }
`

export const GET_MANUFACTURERS = gql`
  query Query(
    $companyId: String!
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
  ) {
    getManufacturers(
      companyId: $companyId
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
    ) {
      manufacturers {
        companyName
        productsCount
        extendedProperties
        id
        homepage
      }
      totalCount
    }
  }
`

export const GET_MANUFACTURER_PRODUCTS = gql`
  query GetManufacturerProducts(
    $companyId: String!
    $manufacturerId: String
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
  ) {
    getManufacturerProducts(
      companyId: $companyId
      manufacturerId: $manufacturerId
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
    ) {
      products {
        id
        EPA
        commonName
        externalId
        gaPageParam
        hasIcon
        iconUrl
        isCanada
        isCoPack
        isUs
        labelDAT
        manId
        manufacturerId
        manufacturerName
        productName
      }
      totalCount
    }
  }
`

export const GET_PAYMENT_TERMS = gql`
  query Query(
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
    $filters: [FilterInput]
  ) {
    getPaymentTerms(
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
      filters: $filters
    ) {
      totalCount
      paymentTerms {
        paymentTerm
        dueDays
        discountPercent
        discountDays
        description
      }
    }
  }
`

export const GET_FARMS = gql`
  query GetFarms(
    $customerId: String
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
    $filters: [FilterInput]
  ) {
    getFarms(
      customerId: $customerId
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
      filters: $filters
    ) {
      farms {
        farmName
        geoLocation {
          latitude
          longitude
        }
        notes
        farmTags {
          farmId
          tagCategoryId
        }
        phoneNumber {
          PhoneNumberType
          phoneNumber
        }
        address {
          addressType
          address {
            addressLine1
            addressLine2
            city
            country
            postalCode
            state
          }
        }
      }
      totalCount
    }
  }
`

export const GET_TAGS = gql`
  query Tags(
    $filters: [FilterInput]
    $sort: String
    $searchTerm: String
    $perPage: Int
    $page: Int
    $tagCategoryName: String
  ) {
    getTags(
      filters: $filters
      sort: $sort
      searchTerm: $searchTerm
      perPage: $perPage
      page: $page
      tagCategoryName: $tagCategoryName
    ) {
      totalCount
      tags {
        id
        tagName
        color
        colorIndex
        icon
        description
        tagCategory {
          tagCategoryName
          color
          icon
        }
      }
      error
    }
  }
`

export const GET_TAG_CATEGORIES = gql`
  query TagCategories(
    $filters: [FilterInput]
    $sort: String
    $searchTerm: String
    $perPage: Int
    $page: Int
  ) {
    getTagCategories(
      filters: $filters
      sort: $sort
      searchTerm: $searchTerm
      perPage: $perPage
      page: $page
    ) {
      tagCategories {
        id
        tagCategoryName
        color
        colorIndex
        icon
        description
        tags {
          id
          tagName
          colorIndex
        }
      }
      totalCount
    }
  }
`

export const GET_TAG_CATEGORY = gql`
  query GetTagCategory($tagCategoryName: String) {
    getTagCategory(tagCategoryName: $tagCategoryName) {
      tagCategory {
        tagCategoryName
        color
        icon
        description
        tags {
          id
          tagName
          color
          colorIndex
          icon
        }
      }
    }
  }
`

export const GET_RETAILER_PRODUCTS = gql`
  query GetRetailerProducts(
    $companyId: String!
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
    $filters: [FilterInput]
    $tagFilters: [TagFilterInput]
  ) {
    getRetailerProducts(
      companyId: $companyId
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
      filters: $filters
      tagFilters: $tagFilters
    ) {
      products {
        productName
        productSku
        retailerProductTags {
          tag {
            id
            tagName
            color
            colorIndex
            icon
            description
            tagCategory {
              tagCategoryName
              color
              icon
              colorIndex
            }
          }
          # tagCategoryId
          tagId
        }
        retailerProductComponents {
          unitOfMeasurement {
            unitName
          }
          unitPrice
          unitOfMeasurementId
          productId
          product {
            id
            commonName
            EPA
            isUs
            manufacturerName
            productName
            manufacturerId
          }
          measurementValue
        }
      }
    }
  }
`

export const GET_UNITS_OF_MEASUREMENT = gql`
  query GetAvailableUnitsOfMeasurement {
    getAvailableUnitsOfMeasurement {
      id
      unitName
      colorIndex
      baseUnit {
        unitName
      }
      numeratorUnit {
        unitName
        id
      }
      denominatorUnit {
        id
        unitName
      }
      numeratorMultiplier
      denominatorMultiplier
      conversionFactor
      baseUnitId
      unitOfMeasurementType
    }
  }
`

export const GET_WAREHOUSES_COMPANY = gql`
  query GetWarehousesForCompany($input: GetWarehousesForCompanyInput!) {
    getWarehousesForCompany(input: $input) {
      warehouses {
        id
        warehouseName
        notes
        phoneNumber
        address {
          addressLine1
          addressLine2
          city
          state
          postalCode
          country
        }
      }
      totalCount
      error
    }
  }
`

export const GET_WAREHOUSE_INFO = gql`
  query GetWarehouseInfo($input: GetWarehouseInfoInput!) {
    getWarehouseInfo(input: $input) {
      warehouse {
        id
        warehouseName
        notes
        phoneNumber
        address {
          addressLine1
          addressLine2
          city
          state
          postalCode
          country
        }
      }
      error
    }
  }
`

export const GET_NUTRIENT_REMOVAL_RATES = gql`
  query GetNutrientRemovalRates($companyId: String!) {
    getNutrientRemovalRates(companyId: $companyId) {
      nutrientRemovalRates {
        nutrient {
          id
          tagName
          colorIndex
          tagCategory {
            tagCategoryName
          }
        }
        crop {
          id
          tagName
          tagCategory {
            tagCategoryName
          }
          colorIndex
        }
        removalRateValue
        removalRateUnit {
          unitName
          id
        }
        year {
          id
          tagName
          tagCategory {
            tagCategoryName
          }
          colorIndex
        }
        companyId
      }
      error
    }
  }
`

export const GET_STORAGE_LOCATIONS = gql`
  query getStorageLocations(
    $warehouseId: Int!
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
    $filters: [FilterInput]
    $tagFilters: [TagFilterInput]
  ) {
    getStorageLocations(
      warehouseId: $warehouseId
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
      filters: $filters
      tagFilters: $tagFilters
    ) {
      storageLocations {
        id
        warehouseId
        name
        description
        identifier
        barcode
        storageTypeId
        parentId
        storageType {
          id
          tagName
          colorIndex
          tagCategory {
            id
            tagCategoryName
            colorIndex
          }
        }
      }
      totalCount
    }
  }
`
export const GET_STORAGE_LOCATIONS_BY_ID = gql`
  query GetStorageLocationById($id: Int!) {
    getStorageLocationById(id: $id) {
      warehouseId
      name
      description
      identifier
      barcode
      storageTypeId
      parentId
    }
  }
`

export const GET_PURCHASE_ORDERS = gql`
  query Query(
    $companyId: String!
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
  ) {
    getPurchaseOrders(
      companyId: $companyId
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
    ) {
      purchaseOrders {
        status
        totalPrice
        orderNumber
        id
        vendorName
        purchaseDate
      }
      totalCount
    }
  }
`
