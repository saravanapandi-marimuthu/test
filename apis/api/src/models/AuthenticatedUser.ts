// models/authenticatedUser.ts
export class AuthenticatedUser {
  authenticated: boolean
  externalId: string
  userId: string
  displayName: string
  email: string
  firstName: string
  middleName: string
  lastName: string
  selectedRole: string
  selectedUserRoleCompanyId: string
  roles: Array<{
    roleId: string
    roleName: string
    companyId: string
    companyName: string
  }>

  constructor(
    authenticated: boolean,
    externalId: string,
    userId: string,
    displayName: string,
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    selectedRole: string,
    selectedRoleCompanyId: string,
    roles: Array<any>,
  ) {
    this.authenticated = authenticated
    this.externalId = externalId
    this.userId = userId
    this.displayName = displayName
    this.email = email
    this.firstName = firstName
    this.middleName = middleName
    this.lastName = lastName
    this.selectedRole = selectedRole
    this.selectedUserRoleCompanyId = selectedRoleCompanyId
    this.roles = roles
  }
}
