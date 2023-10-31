import { CategorizedAddress, CategorizedPhoneNumber } from './sharedTypes'

export class User {
  id: string
  displayName: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  createdAt: string
  roleCount: number
  userRoles: Array<Role>
  selectedUserRole: UserRole
  userSettings: UserSettings

  constructor(
    id: string,
    displayName: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    createdAt: string,
    roleCount: number,
    roles: Array<Role>,
    selectedUserRole: UserRole,
    userSettings: UserSettings,
  ) {
    this.id = id
    this.displayName = displayName
    this.firstName = firstName
    this.middleName = middleName
    this.lastName = lastName
    this.email = email
    this.createdAt = createdAt
    this.roleCount = roleCount
    this.userRoles = roles
    this.selectedUserRole = selectedUserRole
    this.userSettings = userSettings
  }

  getUserName(): string {
    return this.firstName && this.lastName
      ? `${this.firstName} ${this.lastName}`
      : this.email
  }

  getInitial(): string {
    return (this.getUserName() ?? ' ')[0].trim()
  }
}

export type UserRole = {
  id: string
  userId: string
  roleId: string
  companyId: string
  company: Company
  role: Role
}

export type Company = {
  id: string
  companyName: string
}

export type Role = {
  id: string
  roleName: string
}

export type UserSettings = {
  avatarUrl: string
  darkMode: boolean
}

export type UserInfo = {
  id: string
  email: string
  displayName: string
  firstName: string
  middleName: string
  lastName: string
  createdAt: string
  roleCount: number
  addresses: CategorizedAddress[]
  phoneNumbers: CategorizedPhoneNumber[]
  settings?: UserSettings
  userRoles: Role[]
}

export interface UsersData {
  getUsers: {
    users: UserInfo[]
    totalCount: number
  }
}
