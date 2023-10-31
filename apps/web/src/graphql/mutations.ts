import { gql } from '@apollo/client'

export const ADD_COMPANY = gql`
  mutation AddCompany($input: AddCompanyInput!) {
    addCompany(input: $input) {
      name
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput) {
    registerUserWithCompany(input: $input) {
      id
      email
      displayName
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
        phoneNumber {
          countryCode
          number
        }
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

export const ADD_ROLE = gql`
  mutation AddRole($name: String!, $description: String!) {
    addRole(name: $name, description: $description) {
      id
      description
    }
  }
`

export const INVITE_USERS = gql`
  mutation InviteUsers($input: InviteUsersInput) {
    inviteUsers(input: $input) {
      success
      failedEmails
    }
  }
`

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $user: UserInput
    $userAddress: UserAddressInput
    $userPhoneNumber: UserPhoneNumberInput
    $userSettings: UserSettingsInput
    $avatarData: AvatarData
  ) {
    updateUserProfile(
      user: $user
      userAddress: $userAddress
      userPhoneNumber: $userPhoneNumber
      userSettings: $userSettings
      avatarData: $avatarData
    ) {
      id
      email
      displayName
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
        selectedUserRoleId
        additionalSettings
        avatarFallbackImage
        avatarUrl
        darkMode
      }
    }
  }
`

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput) {
    createCustomer(input: $input) {
      success
      customerCompanyId
    }
  }
`

export const CREATE_FARM = gql`
  mutation CreateFarm($input: CreateFarmInput) {
    createFarm(input: $input) {
      farmId
      success
    }
  }
`

export const CREATE_RETAILER_PRODUCT = gql`
  mutation Mutation($input: CreateRetailerProductInput) {
    createRetailerProduct(input: $input) {
      retailerProductId
      success
    }
  }
`

export const UPDATE_RETAILER_PRODUCT = gql`
  mutation UpdateRetailerProduct($input: UpdateRetailerProductInput) {
    updateRetailerProduct(input: $input) {
      retailerProductId
      success
    }
  }
`

export const UPDATE_TAG_CATEGORY = gql`
  mutation Mutation($input: UpdateTagCategoryInput!) {
    updateTagCategory(input: $input) {
      tagCategory {
        tagCategoryName
        color
      }
      error
    }
  }
`

export const CREATE_TAG_CATEGORY = gql`
  mutation Mutation($input: CreateTagCategoryInput!) {
    createTagCategory(input: $input) {
      tagCategory {
        tagCategoryName
      }
      error
    }
  }
`

export const CREATE_TAG = gql`
  mutation Mutation($input: CreateTagInput!) {
    createTag(input: $input) {
      tag {
        tagName
      }
      error
    }
  }
`

export const UPDATE_TAG = gql`
  mutation Mutation($input: UpdateTagInput!) {
    updateTag(input: $input) {
      tag {
        tagName
      }
      error
    }
  }
`

export const ADD_USER_ROLE = gql`
  mutation AddUserRole($input: UserRoleInput) {
    addUserRole(input: $input) {
      userRole {
        companyId
        userId
        roleId
      }
    }
  }
`

export const DELETE_USER_ROLE = gql`
  mutation DeleteUserRole($input: UserRoleInput) {
    deleteUserRole(input: $input) {
      userRole {
        companyId
        userId
        roleId
      }
    }
  }
`

export const CREATE_WAREHOUSE = gql`
  mutation CreateWarehouse($input: CreateWarehouseInput!) {
    createWarehouse(input: $input) {
      warehouse {
        id
      }
      error
    }
  }
`

export const DELETE_WAREHOUSES = gql`
  mutation DeleteWarehouses($input: DeleteWarehousesInput!) {
    deleteWarehouses(input: $input) {
      success
      error
    }
  }
`

export const LINK_ACCOUNT_TO_ENTERPRISE = gql`
  mutation LinkAccountToEnterprise($input: LinkAccountToEnterpriseInput!) {
    linkAccountToEnterprise(input: $input) {
      linkedRelationship {
        firstCompanyId #targetCompanyId
        secondCompanyId #sourceCompanyId
      }
    }
  }
`

export const REMOVE_ACCOUNT_LINK_FROM_ENTERPRISE = gql`
  mutation RemoveAccountLinkFromEnterprise(
    $input: RemoveAccountLinkFromEnterpriseInput!
  ) {
    removeAccountLinkFromEnterprise(input: $input) {
      removedRelationship {
        targetCompanyId
        sourceCompanyId
      }
    }
  }
`

export const CREATE_RELATED_COMPANY = gql`
  mutation CreateRelatedCompany($input: CreateRelatedCompanyInput!) {
    createRelatedCompany(input: $input) {
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
    }
  }
`

export const CREATE_STORAGE_LOCATION = gql`
  mutation CreateStorageLocation($input: CreateStorageLocationInput) {
    createStorageLocation(input: $input) {
      storageLocationId
      success
    }
  }
`

export const UPDATE_STORAGE_LOCATION = gql`
  mutation UpdateStorageLocation($input: UpdateStorageLocationInput) {
    updateStorageLocation(input: $input) {
      storageLocationId
      success
    }
  }
`
