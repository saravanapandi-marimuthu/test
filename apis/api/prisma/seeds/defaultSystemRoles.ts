import { RoleName } from '../../src/models/RoleName'

const defaultSystemRoles: Array<{
  name: string
  description: string
}> = [
  {
    name: RoleName.SuperAdmin,
    description: 'Administrator with all permissions',
  },
  {
    name: RoleName.CompanyAdmin,
    description: 'Company Administrator',
  },
  {
    name: RoleName.BasicUser,
    description: 'User with basic permissions',
  },
  {
    name: RoleName.Agronomist,
    description: 'Agronomist/CCA',
  },
  {
    name: RoleName.OrderManager,
    description: 'Responsible for managing orders',
  },
  {
    name: RoleName.SalesManager,
    description: 'Responsible for sales orders',
  },
  {
    name: RoleName.SalesRep,
    description: 'Sales representative',
  },
  {
    name: RoleName.Applicator,
    description: 'Applicator',
  },
  {
    name: RoleName.Blender,
    description: 'Blender',
  },
  {
    name: RoleName.Dispatcher,
    description: 'Dispatcher',
  },
  {
    name: RoleName.Driver,
    description: 'Driver',
  },
  {
    name: RoleName.Contact,
    description: 'Contact',
  },
  {
    name: RoleName.Puller,
    description: 'Soil Sample Puller',
  },
]

export default defaultSystemRoles
