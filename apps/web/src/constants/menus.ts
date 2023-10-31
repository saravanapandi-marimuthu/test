import {
  ClipboardText as ClipboardTextIcon,
  Tag as TagIcon,
  Truck as TruckIcon,
  AddressBook as AddressBookIcon,
  Buildings as BuildingsIcon,
  Leaf as LeafIcon,
  MapPinLine as MapPinLineIcon,
  GasPump as GasPumpIcon,
  Barcode as BarcodeIcon,
  BookOpen as BookOpenIcon,
  Receipt as ReceiptIcon,
  Factory as FactoryIcon,
  UsersFour as UsersFourIcon,
  Archive as ArchiveIcon,
  BookOpenText as BookOpenTextIcon,
  IdentificationBadge as IdentificationBadgeIcon,
  GearSix as GearSizIcon,
  Storefront as StorefrontIcon,
  UserList as UserListIcon,
  TreeStructure as TreeStructureIcon,
  Warehouse as WarehouseIcon,
} from '@phosphor-icons/react'
import { Resource, UserActions } from '../graphql/generated/graphql'

const iconSize = 20

export const ADD_MENUS = [
  {
    header: 'Orders',
    menus: [
      { name: 'Plan', to: '', icon: ClipboardTextIcon, iconSize },
      { name: 'Order', to: '', icon: TagIcon, iconSize },
      { name: 'Purchase Order', to: '', icon: TruckIcon, iconSize },
    ],
  },
  {
    header: 'Customer',
    menus: [
      { name: 'Account', to: '', icon: AddressBookIcon, iconSize },
      { name: 'Enterprise', to: '', icon: BuildingsIcon, iconSize },
    ],
  },
  {
    header: 'Locations',
    menus: [
      { name: 'Field', to: '', icon: LeafIcon, iconSize },
      { name: 'Ship-To', to: '', icon: MapPinLineIcon, iconSize },
      { name: 'Tank', to: '', icon: GasPumpIcon, iconSize },
    ],
  },
]

export const LEFT_MENUS = [
  {
    menu: 'Admins',
    icon: UserListIcon,
    collapseOpen: false,
    permission: { action: UserActions.All, resource: Resource.All },
    subMenus: [
      { name: 'Companies', route: '/companies', icon: FactoryIcon, iconSize },
      { name: 'Users', route: '/users', icon: UsersFourIcon, iconSize },
      {
        name: 'Configurations',
        route: '/adminconfig',
        icon: GearSizIcon,
        iconSize,
      },
    ],
  },
  {
    menu: 'Org',
    icon: UserListIcon,
    collapseOpen: false,
    permission: { action: UserActions.All, resource: Resource.All },
    subMenus: [
      {
        name: 'Organization',
        route: '/organization',
        icon: TreeStructureIcon,
        iconSize,
      },
      {
        name: 'Warehouses',
        route: '/warehouses',
        icon: WarehouseIcon,
        iconSize,
      },
    ],
  },
  {
    menu: 'Orders',
    icon: TagIcon,
    collapseOpen: false,
    permission: { action: UserActions.All, resource: Resource.All },
    subMenus: [
      {
        name: 'Orders',
        route: '/organization',
        icon: TagIcon,
        iconSize,
      },
      {
        name: 'Invoices',
        route: '/warehouses',
        icon: ReceiptIcon,
        iconSize,
      },
      {
        name: 'Purchase Orders',
        route: '/purchase-orders',
        icon: TruckIcon,
        iconSize,
      },
    ],
  },
  {
    menu: 'Customers',
    icon: IdentificationBadgeIcon,
    collapseOpen: false,
    permission: { action: UserActions.All, resource: Resource.All },
    subMenus: [
      {
        name: 'Accounts',
        route: '/accounts',
        icon: AddressBookIcon,
        iconSize,
      },
      {
        name: 'Enterprises',
        route: '/enterprises',
        icon: BuildingsIcon,
        iconSize,
      },
    ],
  },
  {
    menu: 'Inventory & Products',
    icon: BookOpenTextIcon,
    collapseOpen: false,
    permission: { action: UserActions.All, resource: Resource.All },
    subMenus: [
      {
        name: 'Vendors',
        route: '/vendors',
        icon: StorefrontIcon,
        iconSize,
      },
      {
        name: 'Retailer Products',
        route: '/retailer-products',
        pathname: '/sales/retailer-products',
        icon: BarcodeIcon,
        iconSize,
      },
      {
        name: 'Manufacturers',
        route: '/manufacturers',
        icon: FactoryIcon,
        iconSize,
      },
      {
        name: 'Master Product Catalog',
        route: '/manufacturer-product-search',
        icon: BookOpenIcon,
        iconSize,
      },
      {
        name: 'Inventory',
        route: '/inventory',
        icon: ArchiveIcon,
        iconSize,
      },
    ],
  },
]
