import { gql } from '@apollo/client'

export const LINK_COMPANIES = gql`
  mutation LinkCompanies($input: LinkCompaniesInput!) {
    linkCompanies(input: $input) {
      linkedRelationship {
        companyRelationshipId
        companyRelationshipStatus
        companyRelationshipTypeId
        firstCompanyId
        secondCompanyId
      }
    }
  }
`

export const UNLINK_COMPANIES = gql`
  mutation UnlinkCompanies($input: UnlinkCompaniesInput!) {
    unlinkCompanies(input: $input) {
      unlinkedRelationship {
        companyRelationshipTypeId
        companyRelationshipStatus
        companyRelationshipId
        firstCompanyId
        secondCompanyId
      }
    }
  }
`
