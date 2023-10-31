export enum CompanyTypeEnum {
  SYSTEM = 'SYSTEM',
  AG_RETAILER = 'AG_RETAILER',
  ACCOUNT = 'ACCOUNT',
  MANUFACTURER = 'MANUFACTURER',
  DISTRIBUTOR = 'DISTRIBUTOR',
  ENTERPRISE = 'ENTERPRISE',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
}

export const companyTypeDisplayNames = new Map<CompanyTypeEnum, string>([
  [CompanyTypeEnum.SYSTEM, 'System'],
  [CompanyTypeEnum.AG_RETAILER, 'Ag Retailer'],
  [CompanyTypeEnum.ACCOUNT, 'Account'],
  [CompanyTypeEnum.MANUFACTURER, 'Manufacturer'],
  [CompanyTypeEnum.DISTRIBUTOR, 'Distributor'],
  [CompanyTypeEnum.ENTERPRISE, 'Enterprise'],
  [CompanyTypeEnum.SERVICE_PROVIDER, 'Service Provider'],
])

export enum CompanyRelationshipTypeEnum {
  CUSTOMER_ACCOUNT = 'CUSTOMER_ACCOUNT',
  ENTERPRISE_OWNER = 'ENTERPRISE_OWNER',
  ENTERPRISE_SERVICE_RETAILER = 'ENTERPRISE_SERVICE_RETAILER',
  RETAILER_VENDOR = 'RETAILER_VENDOR',
}

export const companyRelationshipTypeDisplayNames = new Map<
  CompanyRelationshipTypeEnum,
  string
>([
  [CompanyRelationshipTypeEnum.CUSTOMER_ACCOUNT, 'Customer Account'],
  [CompanyRelationshipTypeEnum.ENTERPRISE_OWNER, 'Enterprise Owner'],
  [
    CompanyRelationshipTypeEnum.ENTERPRISE_SERVICE_RETAILER,
    'Enterprise Service Retailer',
  ],
  [
    CompanyRelationshipTypeEnum.RETAILER_VENDOR,
    'Vendor Servicing the Retailer',
  ],
])

export enum TagCategoryType {
  COMPANY_TYPE = 'CompanyType',
  COMPANY_RELATIONSHIP_TYPE = 'CompanyRelationshipType',
  ENTERPRISE_ITEM_TYPE = 'EnterpriseItemType',
  CUSTOMER_LEVEL = 'CustomerLevel',
  CROP_YEAR = 'CropYear',
  TREATMENT_TYPE = 'TreatmentType',
  CROP = 'Crop',
  BILLING_SPLIT_TIER_1 = 'BillingSplitTier1',
  BILLING_SPLIT_TIER_2 = 'BillingSplitTier2',
  BILLING_SPLIT_TIER_3 = 'BillingSplitTier3',
  BILLING_SPLIT_TIER_4 = 'BillingSplitTier4',
  PRODUCT_TYPE = 'ProductType',
  PACKAGE_TYPE = 'PackageType',
  FIELD_LAYER_TYPE = 'FieldLayerType',
  NUTRIENT = 'Nutrient',
}

export enum EnterpriseItemType {
  FARM = 'Farm',
  SHIP_TO = 'ShipTo',
  TANK = 'Tank',
}

export enum CustomerLevel {
  PLATINUM = 'Platinum',
  GOLD = 'Gold',
  SILVER = 'Silver',
}

export enum CropYear {
  YEAR_2022 = '2022',
  YEAR_2023 = '2023',
  YEAR_2024 = '2024',
  YEAR_2025 = '2025',
}

export enum TreatmentType {
  PRE = 'Pre',
  POST = 'Post',
}

export enum Crop {
  CORN = 'Corn',
  SOYBEANS = 'Soybeans',
  WHEAT = 'Wheat',
  COTTON = 'Cotton',
  HAY = 'Hay',
  RICE = 'Rice',
  BARLEY = 'Barley',
  SORGHUM = 'Sorghum',
  OATS = 'Oats',
  PEANUTS = 'Peanuts',
}

export enum BillingSplitTier1 {
  ENTERPRISE_ITEM = 'Enterprise Item',
}

export enum BillingSplitTier2 {
  PRODUCTS = 'Products',
  SERVICES = 'Services',
}

export enum BillingSplitTier3 {
  PRODUCTS_FUEL = 'Products:Fuel',
  PRODUCTS_CHEMICALS = 'Products:Chemicals',
  PRODUCTS_SEED = 'Products:Seed',
  PRODUCTS_FERTILIZER = 'Products:Fertilizer',
  PRODUCTS_OTHER = 'Products:Other',
  SERVICES_APPLICATION = 'Services:Application',
  SERVICES_SOIL_SAMPLING = 'Services:SoilSampling',
  SERVICES_SCOUTING = 'Services:Scouting',
  SERVICES_DELIVERY = 'Services:Delivery',
  SERVICES_ARIAL_IMAGERY = 'Services:ArialImagery',
  SERVICES_OTHER = 'Services:Other',
}

export enum BillingSplitTier4 {
  PRODUCT = 'Product',
  SERVICE = 'Service',
  OTHER = 'Other',
}

export enum ProductType {
  CHEMICAL = 'Chemical',
  SEED = 'Seed',
  FERTILIZER = 'Fertilizer',
  EQUIPMENT = 'Equipment',
  MINERAL = 'Mineral',
  OTHER = 'Other',
}

export enum PackageType {
  BASE = 'Base',
  CASE = 'Case',
  BULK = 'Bulk',
  MINI_BULK = 'MiniBulk',
  BAG = 'Bag',
  TOTE = 'Tote',
  OTHER = 'Other',
}

export enum FieldLayerType {
  FIELD_BOUNDARY = 'Field Boundary',
  SOIL_SAMPLING_GRIDS = 'Soil Sampling Grids',
  SOIL_HEALTH_MAPS = 'Soil Health Maps',
  YIELD_MAPS = 'Yield Maps',
  CROP_ZONE = 'Crop Zone',
  IRRIGATION_ZONE = 'Irrigation Zone',
  PEST_DISEASE_PRESSURE_ZONES = 'Pest/Disease Pressure Zones',
  ELEVATION_TOPOGRAPHY = 'Elevation/Topography',
  MANAGEMENT_ZONES = 'Management Zones', // Till vs No-Till
  WEATHER_STATIONS_SENSORS = 'Weather Stations/Sensors',
  FERTILIZER_APPLICATION = 'Fertilizer Application',
  CHEMICAL_APPLICATION = 'Chemical Application',
  SEED_APPLICATION = 'Seed Application',
  IRRIGATION_APPLICATION = 'Irrigation Application',
  COVER_CROP = 'Cover Crop',
  TILLAGE = 'Tillage',
  LIME_GYPSUM_APPLICATION = 'Lime/Gypsum Application',
  OTHER = 'Other',
}
