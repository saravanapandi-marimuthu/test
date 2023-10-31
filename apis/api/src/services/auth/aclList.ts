import { Action, Resource, buildPermission } from '../../models/Action'
import { RoleName } from '../../models/RoleName'

const allRolesActions = [
  buildPermission(Action.Read, Resource.Configuration),
  buildPermission(Action.Read, Resource.Product),
  buildPermission(Action.All, Resource.UserProfile),
]

export const ACL = {
  [RoleName.SuperAdmin]: [`${Action.All}.${Resource.All}`], // SuperAdmin has all permissions

  [RoleName.CompanyAdmin]: [
    ...allRolesActions,
    buildPermission(Action.Read, Resource.Configuration),
    buildPermission(Action.All, Resource.User),
    buildPermission(Action.All, Resource.Customer),
    buildPermission(Action.All, Resource.Warehouse),
    buildPermission(Action.All, Resource.Company),
  ],
  [RoleName.Applicator]: [...allRolesActions],
  [RoleName.BasicUser]: [...allRolesActions],
  [RoleName.Blender]: [...allRolesActions],
  [RoleName.Dispatcher]: [...allRolesActions],
  [RoleName.Driver]: [...allRolesActions],
  [RoleName.OrderManager]: [...allRolesActions],
  [RoleName.SalesManager]: [
    ...allRolesActions,
    buildPermission(Action.All, Resource.Customer),
    buildPermission(Action.All, Resource.Product),
    buildPermission(Action.All, Resource.User),
    buildPermission(Action.All, Resource.Warehouse),
    buildPermission(Action.All, Resource.Company),
    buildPermission(Action.All, Resource.Order),
    buildPermission(Action.All, Resource.Field),
    buildPermission(Action.All, Resource.Manufacturer),
  ],
  [RoleName.SalesRep]: [...allRolesActions],
}
