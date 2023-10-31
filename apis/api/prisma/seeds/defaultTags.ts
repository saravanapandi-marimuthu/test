export const maxColors: number = 15

export const defaultTags: Array<{
  tagCategoryName: string
  tagNames: Array<string>
}> = [
  {
    tagCategoryName: 'Enterprise Item Type',
    tagNames: ['Field', 'ShipTo', 'Tank'],
  },
  {
    tagCategoryName: 'Customer Level',
    tagNames: ['Platinum', 'Gold', 'Silver'],
  },
  {
    tagCategoryName: 'Crop Year',
    tagNames: [
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      '2026',
      '2027',
      '2028',
      '2029',
      '2030',
    ],
  },
  {
    tagCategoryName: 'Retail Order Type',
    tagNames: ['Product', 'Service', 'Other'],
  },
  {
    tagCategoryName: 'Treatment Type',
    tagNames: ['Pre', 'Post'],
  },
  {
    tagCategoryName: 'Crop',
    tagNames: [
      'Corn',
      'Soybeans',
      'Wheat',
      'Cotton',
      'Hay',
      'Rice',
      'Barley',
      'Sorghum',
      'Oats',
      'Peanuts',
    ],
  },
  {
    tagCategoryName: 'Billing Split Tier 1',
    tagNames: ['Enterprise Item'],
  },
  {
    tagCategoryName: 'Billing Split Tier 2',
    tagNames: ['Products', 'Services'],
  },
  {
    tagCategoryName: 'Billing Split Tier 3',
    tagNames: [
      'Products:Fuel',
      'Products:Chemicals',
      'Products:Seed',
      'Products:Fertilizer',
      'Products:Other',
      'Services:Application',
      'Services:SoilSampling',
      'Services:Scouting',
      'Services:Delivery',
      'Services:ArialImagery',
      'Services:Other',
    ],
  },
  {
    tagCategoryName: 'Billing Split Tier 4',
    tagNames: ['Product', 'Service', 'Other'],
  },

  {
    tagCategoryName: 'Product Type',
    tagNames: [
      'Chemical',
      'Seed',
      'Fertilizer',
      'Equipment',
      'Mineral',
      'Other',
    ],
  },
  {
    tagCategoryName: 'Package Type',
    tagNames: ['Base', 'Case', 'Bulk', 'MiniBulk', 'Bag', 'Tote', 'Other'],
  },
  {
    tagCategoryName: 'Field Layer Type',
    tagNames: [
      'Field Boundary',
      'Soil Sampling Grids',
      'Soil Health Maps',
      'Yield Maps',
      'Crop Zone',
      'Irrigation Zone',
      'Pest/Disease Pressure Zones',
      'Elevation/Topography',
      'Management Zones', // Till vs No-Till
      'Weather Stations/Sensors',
      'Fertilizer Application',
      'Chemical Application',
      'Seed Application',
      'Irrigation Application',
      'Cover Crop',
      'Tillage',
      'Lime/Gypsum Application',
      'Other',
    ],
  },
  {
    tagCategoryName: 'Vendor Type',
    tagNames: ['Seed', 'Chemical', 'Fertilizer', 'Equipment', 'Other'],
  },
  {
    tagCategoryName: 'Accounting Periods',
    tagNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November ',
      'December',
    ],
  },
  {
    tagCategoryName: 'Accounting Period Types',
    tagNames: ['Monthly', 'Quarterly', 'Annually'],
  },
  {
    tagCategoryName: 'Accounting Period Statuses',
    tagNames: ['Open', 'Closed'],
  },
  {
    tagCategoryName: 'Storage Location Types',
    tagNames: [
      'Warehouse Zone',
      'Storage Aisle',
      'Storage Rack',
      'Storage Bay',
      'Storage Shelf',
      'Storage Container', // Pallet, Tote, Bin, Slot, etc.
    ],
  },
  {
    tagCategoryName: 'Purchase Order Status',
    tagNames: ['Pending', 'Approved', 'Ordered', 'Received', 'Cancelled'],
  },
  {
    tagCategoryName: 'Retailer Sales Order Status',
    tagNames: [
      'Pending',
      'Approved',
      'Ordered',
      'Received',
      'Cancelled',
      'Invoiced',
    ],
  },
  {
    tagCategoryName: 'Nutrient',
    tagNames: [
      'Nitrogen (N)', // N
      'Phosphorus (P2O5)', // P2O5
      'Potassium (K20)', // K2O
      'Sulfur (S)', // S
      'Calcium carbonate equivalent (CCE)', // CCE
      'Zinc (Zn)', // Zn
      'Boron (B)', // B
      'Magnesium (Mg)', // Mg
      'Metabolizable protein (MP)', // MP
      'Sulfate (S04)', // SO4
      'Iron (Fe)', // Fe
      'Copper (Cu)', // Cu
      'Molybdenum (Mo)', // Mo
      'Chlorine (Cl)', // Cl
      'Calcium (Ca)', // Ca
      'Gypsum (CaSO4)', // CaSO4
    ],
  },
  {
    tagCategoryName: 'Subsidiary Type',
    tagNames: ['Full Service Retailer', 'Fertilizer Hub'],
  },
  {
    tagCategoryName: 'Order Type',
    tagNames: ['Chemical Application', 'Fertilizer Application', 'Seed'],
  },
]
