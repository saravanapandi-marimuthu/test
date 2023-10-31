import { gql } from '@apollo/client'

export const GET_ACCOUNT_ENTERPRISE_ITEMS = gql`
  query GetAccountEnterpriseItems($input: GetAccountEnterpriseItemsInput!) {
    getAccountEnterpriseItems(input: $input) {
      enterpriseItem {
        companyId
      }
      field {
        id
        fieldName
        active
        plssLocation
        plssLocationState
        notes
        geoLocation {
          latitude
          longitude
        }
        fieldTags {
          tag {
            tagName
            colorIndex
            tagCategory {
              tagCategoryName
            }
          }
        }

        fieldVersions {
          id
          active
          startDate
          estimatedArea
          fieldVersionTags {
            tag {
              tagName
              tagCategory {
                tagCategoryName
              }
            }
          }
          fieldLayers {
            id
            geoJsonData
            fieldLayerZones {
              id
              geoLocation {
                latitude
                longitude
                accuracy
              }
            }
          }
        }
      }
    }
  }
`

export const GET_FIELDS_FOR_COMPANY = gql`
  query GetFieldsForCompany($input: GetFieldsForCompanyInput!) {
    getFieldsForCompany(input: $input) {
      field {
        id
        fieldName
        active
        plssLocation
        plssLocationState
        notes
        geoLocation {
          latitude
          longitude
        }
        fieldTags {
          tag {
            tagName
            colorIndex
            tagCategory {
              tagCategoryName
            }
          }
        }

        fieldVersions {
          id
          active
          startDate
          estimatedArea
          fieldVersionTags {
            tag {
              tagName
              tagCategory {
                tagCategoryName
              }
            }
          }
          fieldLayers {
            id
            geoJsonData
            fieldLayerZones {
              id
              geoLocation {
                latitude
                longitude
                accuracy
              }
            }
          }
        }
      }
    }
  }
`
