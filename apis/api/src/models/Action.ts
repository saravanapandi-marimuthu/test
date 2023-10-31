/**
 * Lists all actions that a user can perform in the system
 */
export enum Action {
  All = 'All',
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export enum Resource {
  All = 'All',
  UserProfile = 'UserProfile',
  User = 'User',
  Company = 'Company',
  Configuration = 'Configuration',
  Order = 'Order',
  Customer = 'Customer',
  Product = 'Product',
  Warehouse = 'Warehouse',
  Manufacturer = 'Manufacturer',
  Field = 'Field',
  StorageLocation = 'StorageLocation',
  NutrientRemovalRate = 'NutrientRemovalRate',
}

export type Permission = `${Action}.${Resource}`

export const buildPermission = (
  action: Action,
  resource: Resource,
): Permission => {
  return `${action}.${resource}`
}
