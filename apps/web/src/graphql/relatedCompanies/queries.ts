/*
import { gql } from '@apollo/client'

export const GET_RELATED_COMPANIES = gql`
  query RelatedCompanies(
    $companyId: String!
    $relationshipType: CompanyRelationshipTypeEnum!
    $page: Int
    $perPage: Int
    $searchTerm: String
    $sort: String
    $filters: [FilterInput]
    $tagFilters: [TagFilterInput]
  ) {
    getRelatedCompanies(
      companyId: $companyId
      relationshipType: $relationshipType
      page: $page
      perPage: $perPage
      searchTerm: $searchTerm
      sort: $sort
      filters: $filters
      tagFilters: $tagFilters
    ) {
      relatedCompanies {
        companyRelationship {
          companyRelationshipTags {
            tag {
              tagName
              colorIndex
              tagCategory {
                tagCategoryName
              }
            }
            tagId
          }
          extendedProperties
          firstCompanyId
          secondCompanyId
        }
        companyRelationshipType {
          companyRelationshipTypeName
          colorId
          color
          displayName
        }
        companyRelationshipTypeId
        firstCompanyId
        secondCompanyId
        companyRelationshipType {
          companyRelationshipTypeName
          displayName
        }
        firstCompanyId
        secondCompanyId
        secondCompany {
          companyName
          companyTags {
            tag {
              tagCategory {
                tagCategoryName
              }
              tagName
              colorIndex
            }
          }
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
              addresses {
                addressType
                address {
                  addressLine1
                  addressLine2
                  city
                  state
                  country
                  postalCode
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`

export const GET_RELATED_COMPANY = gql`
  query GetRelatedCompany(
    $companyId: String!
    $relatedCompanyId: String!
    $companyRelationshipType: CompanyRelationshipTypeEnum!
  ) {
    getRelatedCompany(
      companyId: $companyId
      relatedCompanyId: $relatedCompanyId
      companyRelationshipType: $companyRelationshipType
    ) {
      relatedCompany {
        companyRelationship {
          companyRelationshipTags {
            tag {
              tagName
              colorIndex
              tagCategory {
                tagCategoryName
              }
            }
            tagId
          }
          extendedProperties
          firstCompanyId
          secondCompanyId
        }
        companyRelationshipType {
          companyRelationshipTypeName
          colorId
          color
          displayName
        }
        companyRelationshipTypeId
        firstCompanyId
        secondCompanyId
        secondCompany {
          companyName
          companyTags {
            tag {
              tagCategory {
                tagCategoryName
              }
              tagName
              colorIndex
            }
          }
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
              addresses {
                addressType
                address {
                  addressLine1
                  addressLine2
                  city
                  state
                  country
                  postalCode
                }
              }
            }
          }
        }
      }
    }
  }
`
*/
