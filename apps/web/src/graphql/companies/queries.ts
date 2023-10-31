import { gql } from '@apollo/client'

export const SEARCH_COMPANIES = gql`
  query SearchCompanies($search: String!) {
    companies(search: $search) {
      id
      companyName
    }
  }
`

export const GET_COMPANIES = gql`
  query GetCompanies(
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
  ) {
    getCompanies(
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
    ) {
      companies {
        id
        companyName
        companyType {
          companyTypeName
          displayName
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
            id
          }
        }
        phoneNumbers {
          phoneNumberType
          phoneNumber
        }
        roles {
          role {
            roleName
          }
          user {
            email
            firstName
            lastName
            middleName
            phoneNumbers {
              phoneNumberType
              phoneNumber
            }
            addresses {
              address {
                addressLine1
                addressLine2
                city
                country
                postalCode
                state
              }
              addressType
            }
          }
        }
      }
      totalCount
    }
  }
`

export const GET_SUBSIDIARY_COMPANIES = gql`
  query GetCompanies(
    $parentCompanyId: String!
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
  ) {
    getSubsidiaryCompanies(
      parentCompanyId: $parentCompanyId
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
    ) {
      companies {
        id
        companyName
        companyType {
          companyTypeName
          displayName
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
            id
          }
        }
        phoneNumbers {
          phoneNumberType
          phoneNumber
        }
        roles {
          role {
            roleName
          }
          user {
            email
            firstName
            lastName
            middleName
            phoneNumbers {
              phoneNumberType
              phoneNumber
            }
            addresses {
              address {
                addressLine1
                addressLine2
                city
                country
                postalCode
                state
              }
              addressType
            }
          }
        }
        parentCompany {
          id
          companyName
          companyType {
            companyTypeName
            displayName
          }
        }
      }
      totalCount
    }
  }
`

export const GET_COMPANY = gql`
  query GetCompany($companyId: String, $companyName: String) {
    getCompany(companyId: $companyId, companyName: $companyName) {
      id
      companyName
      companyType {
        companyTypeName
        displayName
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
          id
        }
      }
      phoneNumbers {
        phoneNumberType
        phoneNumber
      }
      roles {
        role {
          roleName
        }
        user {
          email
          firstName
          lastName
          middleName
          phoneNumbers {
            phoneNumberType
            phoneNumber
          }
          addresses {
            address {
              addressLine1
              addressLine2
              city
              country
              postalCode
              state
            }
            addressType
          }
        }
      }
    }
  }
`

const BASE_FIELDS = `
  id
  companyName
  companyType {
    companyTypeName
    displayName
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
        id
    }
  }
  phoneNumbers {
    phoneNumberType
    phoneNumber
  }
  companyTags {
    tag {
      tagName
      tagCategory {
        tagCategoryName
      }
    }
  }
  roles {
    role {
      roleName
    }
    user {
      email
      firstName
      lastName
      middleName
      phoneNumbers {
        phoneNumberType
        phoneNumber
      }
      addresses {
        address {
          addressLine1
          addressLine2
          city
          country
          postalCode
          state
        }
        addressType
      }
    }
  }
  parentCompany {
    id
    companyName
    companyType {
      companyTypeName
      displayName
    }
  }  
`

const createSubsidiaryFragment = (depth: number): string => {
  if (depth === 0) return BASE_FIELDS

  return `
    ${BASE_FIELDS}
    childCompanies {
      ${createSubsidiaryFragment(depth - 1)}
    }
  `
}

export const createSubsidiaryQuery = (depth: number): string => {
  return `
    query GetSubsidiaryCompaniesTree($input: GetSubsidiaryCompaniesTreeInput) {
      getSubsidiaryCompaniesTree(input: $input) {
        companies { 
            ${createSubsidiaryFragment(depth)} 
        }
      }
    }
  `
}
