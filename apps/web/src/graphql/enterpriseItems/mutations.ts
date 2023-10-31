import { gql } from '@apollo/client'

export const CREATE_FIELD = gql`
  mutation CreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      enterpriseItem {
        companyId
      }
      field {
        fieldName
      }
    }
  }
`
