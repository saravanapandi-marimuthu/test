// MODALS
import { DataFlexModal } from '../types/types'

export const ADD_MODAL_DATA: DataFlexModal = {
  id: 'Add',
  title: 'AD #12345',
}
export const EDIT_MODAL_DATA: DataFlexModal = {
  id: 23,
  title: 'ED #12-34-57-89',
}
export const ADD_EDIT_MODAL_DATA: DataFlexModal[] = []
export const LANG_BOTTOM_MODAL: number = 2
export const MAP_MARKER_SIZE = 36

// COMPANY CONFIGURATION DETAILS
export const COMPANY_CONFIGURATION_TAB = [
  'Overview',
  'Presets',
  'Communication',
  'Others',
]

// CUSTOMER ACCOUNT DETAILS
export const CUSTOMER_ACCOUNT_TAB = [
  'Overview',
  'Activity',
  'Enterprises',
  'Locations',
  'Orders',
  'Prepay Account',
  'Invoices',
  'Documents',
]

// ENTERPRISE/FARM DETAILS
export const ENTERPRISE_TAB = [
  'Overview',
  'Accounts',
  'Orders',
  'Invoices',
  'Documents',
]

// WAREHOUSE_TAB
export const WAREHOUSE_TAB = [
  'Overview',
  'Inventory Storage Locations',
  // 'Inventory',
]

// ORGANIZATION_TAB
export const ORGANIZATION_TAB = [
  'Subsidiaries and branches',
  'Overview',
  'Enterprises',
  'Locations',
  'Orders',
  'Prepay Account',
  'Invoices',
  'Documents',
]

export type TagColor = {
  name: string
  dark: string
  light: string
}

export const TAG_COLORS: TagColor[] = [
  {
    name: 'Blue',
    dark: '#28456C',
    light: '#D3E5EF',
  },
  {
    name: 'Pastel Orange',
    dark: '#854C1D',
    light: '#FADEC9',
  },
  {
    name: 'Purple',
    dark: '#492F64',
    light: '#E8DEEE',
  },
  {
    name: 'Red',
    dark: '#6E3630',
    light: '#FFE2DD',
  },
  {
    name: 'Brown',
    dark: '#603B2C',
    light: '#EEE0DA',
  },
  {
    name: 'Yellow',
    dark: '#89632A',
    light: '#FDECC8',
  },
  {
    name: 'Pink',
    dark: '#69314C',
    light: '#F5E0E9',
  },
  {
    name: 'Pastel Peach',
    dark: '#6C4D28',
    light: '#FFDFB9',
  },
  {
    name: 'Green',
    dark: '#2B593F',
    light: '#DBEDDB',
  },
  {
    name: 'Gray',
    dark: '#5A5A5A',
    light: '#E3E2E0',
  },
  {
    name: 'Light Gray',
    dark: ' #373737',
    light: '#E3E2E080',
  },
  {
    name: 'Dark Pink',
    dark: '#5A4044',
    light: '#FFB6C1',
  },
  {
    name: 'Pastel Red',
    dark: '#6C2420',
    light: '#FF6961',
  },
  {
    name: 'Pastel Green',
    dark: '#354935',
    light: '#77DD77',
  },
  {
    name: 'Pastel Pink',
    dark: '#861748',
    light: '#F49AC2',
  },
]

export type PolygonColor = {
  fillColor: string
  strokeColor: string
}

export const POLYGON_COLORS_BACK: PolygonColor[] = [
  // Reddish Purple
  { fillColor: '#CC79A7', strokeColor: '#8F5571' },
  // Yellow
  { fillColor: '#F0E442', strokeColor: '#A49B30' },
  // Vermilion
  { fillColor: '#D55E00', strokeColor: '#913C00' },
  // Orange
  { fillColor: '#E69F00', strokeColor: '#A46500' },
  // Sky Blue
  { fillColor: '#56B4E9', strokeColor: '#337DA4' },
  // Teal
  { fillColor: '#009E73', strokeColor: '#006B51' },
  // Blue
  { fillColor: '#0072B2', strokeColor: '#004D80' },
  // Grey
  { fillColor: '#999999', strokeColor: '#666666' },
  // Dark Blue
  { fillColor: '#332288', strokeColor: '#1C135E' },
  // Light Blue
  { fillColor: '#88CCEE', strokeColor: '#5CA6BB' },
]

export const POLYGON_COLORS_2: PolygonColor[] = [
  // Warm Red
  { fillColor: '#E63946', strokeColor: '#B32A35' },
  // Light Purple
  { fillColor: '#9D4EDD', strokeColor: '#732EA9' },
  // Orchid
  { fillColor: '#E081C9', strokeColor: '#A75C91' },
  // Peach
  { fillColor: '#FFA384', strokeColor: '#C47A63' },
  // Mustard Yellow
  { fillColor: '#F4A261', strokeColor: '#C07849' },
  // Coral
  { fillColor: '#FF6B6B', strokeColor: '#C04E4E' },

  // Light Green
  { fillColor: '#2A9D8F', strokeColor: '#1F7369' },
  // Dark Green
  { fillColor: '#264653', strokeColor: '#1B343A' },
  // Turquoise
  { fillColor: '#48CAE4', strokeColor: '#2E8FA5' },

  // Cerulean
  { fillColor: '#0077B6', strokeColor: '#005287' },
]

export const POLYGON_COLORS: PolygonColor[] = [
  // Red
  { fillColor: '#E10600', strokeColor: '#E10600' },
  // Yellow
  { fillColor: '#FFEB2A', strokeColor: '#FFEB2A' },
  // Purple
  { fillColor: '#6D40F6', strokeColor: '#6D40F6' },
  // Green
  { fillColor: '#00BF55', strokeColor: '#00BF55' },
  // Blue
  { fillColor: '#00B4CF', strokeColor: '#00B4CF' },

  // Coral
  { fillColor: '#FF6B6B', strokeColor: '#C04E4E' },
  // Light Green
  { fillColor: '#2A9D8F', strokeColor: '#1F7369' },
  // Dark Green
  { fillColor: '#264653', strokeColor: '#1B343A' },
  // Turquoise
  { fillColor: '#48CAE4', strokeColor: '#2E8FA5' },
  // Cerulean
  { fillColor: '#0077B6', strokeColor: '#005287' },

  // White
  { fillColor: '#FFFFFF', strokeColor: '#FFFFFF' },
]
