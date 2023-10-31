import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AccountEnterpriseItems = {
  __typename?: 'AccountEnterpriseItems';
  fields?: Maybe<Array<Maybe<EnterpriseField>>>;
};

export type AddOrUpdateUserRoleResult = {
  __typename?: 'AddOrUpdateUserRoleResult';
  userRole: UserRole;
};

export type Address = {
  __typename?: 'Address';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type AddressDetailsInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type AddressInput = {
  address?: InputMaybe<AddressDetailsInput>;
  addressType: AddressType;
};

export enum AddressType {
  BILLING = 'BILLING',
  BUSINESS = 'BUSINESS',
  HOME = 'HOME',
  LEGAL = 'LEGAL',
  MAILING = 'MAILING',
  OTHER = 'OTHER',
  PHYSICAL = 'PHYSICAL',
  RECIPIENT = 'RECIPIENT',
  SERVICE = 'SERVICE',
  SHIPPING = 'SHIPPING'
}

export type AvatarData = {
  avatarData?: InputMaybe<Scalars['String']['input']>;
};

export type BillingAccountSplitAllocation = {
  __typename?: 'BillingAccountSplitAllocation';
  splitGroupAccountId: Scalars['Int']['output'];
  splitItemId: Scalars['Int']['output'];
  splitValue: Scalars['Float']['output'];
  splitValueType: BillingSplitValueType;
};

export type BillingSplitGroup = {
  __typename?: 'BillingSplitGroup';
  billingSplitGroupAccounts?: Maybe<Array<Maybe<BillingSplitGroupAccount>>>;
  defaultSplitItem?: Maybe<BillingSplitItem>;
  defaultSplitItemId?: Maybe<Scalars['Int']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  splitGroupName?: Maybe<Scalars['String']['output']>;
  splitItems?: Maybe<Array<Maybe<BillingSplitItem>>>;
};

export type BillingSplitGroupAccount = {
  __typename?: 'BillingSplitGroupAccount';
  accountCompany?: Maybe<CompanyBasicInfo>;
  accountCompanyId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  splitGroup?: Maybe<BillingSplitGroup>;
  splitGroupId?: Maybe<Scalars['Int']['output']>;
};

export type BillingSplitInput = {
  accountCompanyId?: InputMaybe<Scalars['String']['input']>;
  retailerProductId?: InputMaybe<Scalars['Int']['input']>;
  splitPercentage?: InputMaybe<Scalars['Float']['input']>;
  splitTier?: InputMaybe<TagLinkInput>;
};

export type BillingSplitItem = {
  __typename?: 'BillingSplitItem';
  accountSplitAllocations?: Maybe<Array<Maybe<BillingAccountSplitAllocation>>>;
  id: Scalars['Int']['output'];
  parentSplitItemId?: Maybe<Scalars['Int']['output']>;
  splitGroupId: Scalars['Int']['output'];
  splitTier?: Maybe<Tag>;
};

export enum BillingSplitValueType {
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  PERCENTAGE = 'PERCENTAGE',
  RATIO = 'RATIO'
}

export type Companies = {
  __typename?: 'Companies';
  company: Array<Company>;
  totalCount: Scalars['Int']['output'];
  usersCount: Scalars['Int']['output'];
};

export type Company = {
  __typename?: 'Company';
  addresses?: Maybe<Array<Maybe<CompanyAddress>>>;
  childCompanies?: Maybe<Array<Maybe<Company>>>;
  companyName: Scalars['String']['output'];
  companyNotes?: Maybe<Scalars['String']['output']>;
  companySaaSFeature?: Maybe<Array<Maybe<CompanySaaSFeature>>>;
  companyServiceAccounts?: Maybe<Array<Maybe<CompanyServiceAccount>>>;
  companyShortName?: Maybe<Scalars['String']['output']>;
  companyTags?: Maybe<Array<Maybe<CompanyTag>>>;
  companyType?: Maybe<CompanyType>;
  companyTypeId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  homepage?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  parentCompany?: Maybe<Company>;
  parentCompanyId?: Maybe<Scalars['String']['output']>;
  phoneNumbers?: Maybe<Array<Maybe<CompanyPhoneNumber>>>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyAddress = {
  __typename?: 'CompanyAddress';
  address?: Maybe<Address>;
  addressId: Scalars['Int']['output'];
  addressType: AddressType;
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyBasicInfo = {
  __typename?: 'CompanyBasicInfo';
  companyName: Scalars['String']['output'];
  companyTypeId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
};

export type CompanyPhoneNumber = {
  __typename?: 'CompanyPhoneNumber';
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberType: PhoneNumberType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyRelationship = {
  __typename?: 'CompanyRelationship';
  companyRelationshipId?: Maybe<Scalars['Int']['output']>;
  companyRelationshipStatus: CompanyRelationshipStatus;
  companyRelationshipTags?: Maybe<Array<Maybe<CompanyRelationshipTag>>>;
  companyRelationshipTypeId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  firstCompanyId: Scalars['String']['output'];
  secondCompanyId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum CompanyRelationshipDirection {
  FIRST_TO_SECOND_COMPANY = 'FIRST_TO_SECOND_COMPANY',
  SECOND_TO_FIRST_COMPANY = 'SECOND_TO_FIRST_COMPANY'
}

export enum CompanyRelationshipStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type CompanyRelationshipTag = {
  __typename?: 'CompanyRelationshipTag';
  companyRelationshipId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Tag>;
  tagCategory?: Maybe<TagCategory>;
  tagId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyRelationshipType = {
  __typename?: 'CompanyRelationshipType';
  color?: Maybe<Scalars['String']['output']>;
  colorId?: Maybe<Scalars['Int']['output']>;
  companyRelationshipTypeName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum CompanyRelationshipTypeEnum {
  CUSTOMER_ACCOUNT = 'CUSTOMER_ACCOUNT',
  ENTERPRISE_OWNER = 'ENTERPRISE_OWNER',
  ENTERPRISE_SERVICE_RETAILER = 'ENTERPRISE_SERVICE_RETAILER',
  RETAILER_VENDOR = 'RETAILER_VENDOR'
}

export type CompanySaaSFeature = {
  __typename?: 'CompanySaaSFeature';
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  featureId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyServiceAccount = {
  __typename?: 'CompanyServiceAccount';
  accessToken: Scalars['String']['output'];
  company: Company;
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  service: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyTag = {
  __typename?: 'CompanyTag';
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  tag?: Maybe<Tag>;
  tagId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyType = {
  __typename?: 'CompanyType';
  color?: Maybe<Scalars['String']['output']>;
  colorId?: Maybe<Scalars['Int']['output']>;
  companyTypeName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ContactPersonInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCompanyInput = {
  companyAddress?: InputMaybe<AddressInput>;
  companyExtendedProperties?: InputMaybe<Scalars['JSON']['input']>;
  companyName: Scalars['String']['input'];
  companyNotes?: InputMaybe<Scalars['String']['input']>;
  companyPhoneNumber?: InputMaybe<PhoneNumberInput>;
  companyTags?: InputMaybe<Array<InputMaybe<TagLinkInput>>>;
  companyTypeName: Scalars['String']['input'];
  contactPerson?: InputMaybe<ContactPersonInput>;
  parentCompanyId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerResult = {
  __typename?: 'CreateCustomerResult';
  customerCompanyId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateFieldInput = {
  billingSplitGroupName?: InputMaybe<Scalars['String']['input']>;
  billingSplits?: InputMaybe<Array<InputMaybe<BillingSplitInput>>>;
  enterpriseCompanyId: Scalars['String']['input'];
  estimatedArea?: InputMaybe<Scalars['Float']['input']>;
  fieldBoundaryData?: InputMaybe<Scalars['JSON']['input']>;
  fieldName: Scalars['String']['input'];
  fieldTags?: InputMaybe<Array<InputMaybe<TagLinkInput>>>;
  gpsCoordinates?: InputMaybe<GeoLocationInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plssLocation?: InputMaybe<Scalars['String']['input']>;
  plssLocationState?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRelatedCompanyInput = {
  companyAddress?: InputMaybe<AddressInput>;
  companyExtendedProperties?: InputMaybe<Scalars['JSON']['input']>;
  companyName: Scalars['String']['input'];
  companyNotes?: InputMaybe<Scalars['String']['input']>;
  companyPhoneNumber?: InputMaybe<PhoneNumberInput>;
  companyRelationshipExtendedProperties?: InputMaybe<Scalars['JSON']['input']>;
  companyRelationshipTags?: InputMaybe<Array<InputMaybe<TagLinkInput>>>;
  companyRelationshipType: CompanyRelationshipTypeEnum;
  companyTags?: InputMaybe<Array<InputMaybe<TagLinkInput>>>;
  companyTypeName: Scalars['String']['input'];
  contactPerson?: InputMaybe<ContactPersonInput>;
  providerCompanyId: Scalars['String']['input'];
};

export type CreateRelatedCompanyResult = {
  __typename?: 'CreateRelatedCompanyResult';
  relatedCompany: RelatedCompany;
};

export type CreateRetailerProductInput = {
  components?: InputMaybe<Array<InputMaybe<RetailerProductComponentInput>>>;
  label?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  productSku: Scalars['String']['input'];
  retailerCompanyId: Scalars['String']['input'];
  tags?: InputMaybe<Array<InputMaybe<TagInput>>>;
};

export type CreateRetailerProductResult = {
  __typename?: 'CreateRetailerProductResult';
  retailerProductId?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateStorageLocationInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  storageTypeId: Scalars['Int']['input'];
  warehouseId: Scalars['Int']['input'];
};

export type CreateStorageLocationResult = {
  __typename?: 'CreateStorageLocationResult';
  storageLocationId?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum CreateTagCategoryError {
  TAG_CATEGORY_ALREADY_EXISTS = 'TAG_CATEGORY_ALREADY_EXISTS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type CreateTagCategoryInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  colorIndex?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  tagCategoryName: Scalars['String']['input'];
};

export type CreateTagCategoryResult = {
  __typename?: 'CreateTagCategoryResult';
  error?: Maybe<CreateTagCategoryError>;
  tagCategory?: Maybe<TagCategory>;
};

export enum CreateTagError {
  INVALID_TAG_CATEGORY = 'INVALID_TAG_CATEGORY',
  TAG_ALREADY_EXISTS = 'TAG_ALREADY_EXISTS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type CreateTagInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  colorIndex?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  tagCategoryName: Scalars['String']['input'];
  tagName: Scalars['String']['input'];
};

export type CreateTagResult = {
  __typename?: 'CreateTagResult';
  error?: Maybe<CreateTagError>;
  tag?: Maybe<Tag>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum CreateWarehouseError {
  INVALID_COMPANY_ID = 'INVALID_COMPANY_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type CreateWarehouseInput = {
  address: AddressInput;
  companyId: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
  warehouseName: Scalars['String']['input'];
};

export type CreateWarehouseResult = {
  __typename?: 'CreateWarehouseResult';
  error?: Maybe<CreateWarehouseError>;
  warehouse?: Maybe<Warehouse>;
};

export type Customer = {
  __typename?: 'Customer';
  companyId: Scalars['String']['output'];
  companyRelationshipTags?: Maybe<Array<Maybe<CompanyRelationshipTag>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerCompany?: Maybe<Company>;
  customerCompanyId: Scalars['String']['output'];
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum DeleteStorageLocationError {
  INVALID_STORAGE_LOCATION_ID = 'INVALID_STORAGE_LOCATION_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type DeleteStorageLocationInput = {
  storageLocationId?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteStorageLocationResult = {
  __typename?: 'DeleteStorageLocationResult';
  error?: Maybe<DeleteStorageLocationError>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteUserRoleResult = {
  __typename?: 'DeleteUserRoleResult';
  userRole: UserRole;
};

export enum DeleteWarehousesError {
  INVALID_WAREHOUSE_ID = 'INVALID_WAREHOUSE_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type DeleteWarehousesInput = {
  providerCompanyId: Scalars['String']['input'];
  warehouseIds: Array<InputMaybe<Scalars['Int']['input']>>;
};

export type DeleteWarehousesResult = {
  __typename?: 'DeleteWarehousesResult';
  error?: Maybe<DeleteWarehousesError>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type EnterpriseField = {
  __typename?: 'EnterpriseField';
  enterpriseItem?: Maybe<EnterpriseItem>;
  field?: Maybe<FieldInfo>;
};

export type EnterpriseItem = {
  __typename?: 'EnterpriseItem';
  billingSplitGroup?: Maybe<BillingSplitGroup>;
  companyId: Scalars['String']['output'];
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['Int']['output'];
  itemId: Scalars['Int']['output'];
  itemType?: Maybe<Tag>;
  notes?: Maybe<Scalars['String']['output']>;
};

export type FieldInfo = {
  __typename?: 'FieldInfo';
  active?: Maybe<Scalars['Boolean']['output']>;
  company?: Maybe<Company>;
  fieldName?: Maybe<Scalars['String']['output']>;
  fieldTags?: Maybe<Array<Maybe<FieldTag>>>;
  fieldVersions?: Maybe<Array<Maybe<FieldVersion>>>;
  geoLocation?: Maybe<GeoLocation>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  plssLocation?: Maybe<Scalars['String']['output']>;
  plssLocationState?: Maybe<Scalars['String']['output']>;
};

export type FieldLayer = {
  __typename?: 'FieldLayer';
  area?: Maybe<Scalars['Float']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  fieldLayerZones?: Maybe<Array<Maybe<FieldLayerZone>>>;
  fieldVersionId: Scalars['Int']['output'];
  geoJsonData?: Maybe<Scalars['JSON']['output']>;
  geoLocation?: Maybe<GeoLocation>;
  id: Scalars['Int']['output'];
  layerDescription?: Maybe<Scalars['String']['output']>;
  layerFileName?: Maybe<Scalars['String']['output']>;
  layerName?: Maybe<Scalars['String']['output']>;
  layerType?: Maybe<Tag>;
  manuallyGenerated?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
};

export type FieldLayerZone = {
  __typename?: 'FieldLayerZone';
  area?: Maybe<Scalars['Float']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  fieldLayerId: Scalars['Int']['output'];
  geoJsonData?: Maybe<Scalars['JSON']['output']>;
  geoLocation?: Maybe<GeoLocation>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  zoneColor?: Maybe<Scalars['String']['output']>;
  zoneDescription?: Maybe<Scalars['String']['output']>;
  zoneFileName?: Maybe<Scalars['String']['output']>;
  zoneName: Scalars['String']['output'];
};

export type FieldTag = {
  __typename?: 'FieldTag';
  fieldId: Scalars['Int']['output'];
  tag?: Maybe<Tag>;
  tagId: Scalars['Int']['output'];
};

export type FieldVersion = {
  __typename?: 'FieldVersion';
  active?: Maybe<Scalars['Boolean']['output']>;
  calculatedArea?: Maybe<Scalars['Float']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  estimatedArea?: Maybe<Scalars['Float']['output']>;
  fieldId: Scalars['Int']['output'];
  fieldLayers?: Maybe<Array<Maybe<FieldLayer>>>;
  fieldVersionTags?: Maybe<Array<Maybe<FieldVersionTag>>>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type FieldVersionTag = {
  __typename?: 'FieldVersionTag';
  fieldVersionId: Scalars['Int']['output'];
  tag?: Maybe<Tag>;
  tagId: Scalars['Int']['output'];
};

export type FilterInput = {
  filterField?: InputMaybe<Scalars['String']['input']>;
  filterValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type GeoLocationInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
};

export type GetAccountEnterpriseItemsInput = {
  accountId: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
};

export type GetCompaniesResult = {
  __typename?: 'GetCompaniesResult';
  companies: Array<Company>;
  totalCount: Scalars['Int']['output'];
};

export type GetCustomerResult = {
  __typename?: 'GetCustomerResult';
  customer?: Maybe<Customer>;
};

export type GetCustomersResult = {
  __typename?: 'GetCustomersResult';
  customers: Array<Customer>;
  totalCount: Scalars['Int']['output'];
};

export type GetFieldInput = {
  fieldId: Scalars['Int']['input'];
  providerCompanyId: Scalars['String']['input'];
};

export type GetFieldsForCompanyInput = {
  companyId: Scalars['String']['input'];
};

export type GetManufacturerProductsResult = {
  __typename?: 'GetManufacturerProductsResult';
  products?: Maybe<Array<Maybe<Product>>>;
  totalCount: Scalars['Int']['output'];
};

export type GetManufacturersResult = {
  __typename?: 'GetManufacturersResult';
  manufacturers?: Maybe<Array<Maybe<Manufacturer>>>;
  totalCount: Scalars['Int']['output'];
};

export type GetNutrientRemovalsRateResult = {
  __typename?: 'GetNutrientRemovalsRateResult';
  nutrientRemovalRates: Array<NutrientRemovalRate>;
  totalCount: Scalars['Int']['output'];
};

export type GetPaymentTermsResult = {
  __typename?: 'GetPaymentTermsResult';
  paymentTerms?: Maybe<Array<Maybe<PaymentTerm>>>;
  totalCount: Scalars['Int']['output'];
};

export type GetRelatedCompaniesResult = {
  __typename?: 'GetRelatedCompaniesResult';
  relatedCompanies: Array<RelatedCompany>;
  totalCount: Scalars['Int']['output'];
};

export type GetRelatedCompanyResult = {
  __typename?: 'GetRelatedCompanyResult';
  relatedCompany: RelatedCompany;
};

export type GetRetailerProductResult = {
  __typename?: 'GetRetailerProductResult';
  product?: Maybe<RetailerProduct>;
};

export type GetRetailerProductsResult = {
  __typename?: 'GetRetailerProductsResult';
  products: Array<RetailerProduct>;
  totalCount: Scalars['Int']['output'];
};

export type GetStorageLocationResult = {
  __typename?: 'GetStorageLocationResult';
  storageLocation?: Maybe<StorageLocation>;
};

export type GetStorageLocationsResult = {
  __typename?: 'GetStorageLocationsResult';
  storageLocations: Array<StorageLocation>;
  totalCount: Scalars['Int']['output'];
};

export type GetSubsidiaryCompaniesTreeInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  parentCompanyId: Scalars['String']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  treeDepth?: InputMaybe<Scalars['Int']['input']>;
};

export type GetTagCategoriesResult = {
  __typename?: 'GetTagCategoriesResult';
  tagCategories?: Maybe<Array<Maybe<TagCategory>>>;
  totalCount: Scalars['Int']['output'];
};

export type GetTagCategoryResult = {
  __typename?: 'GetTagCategoryResult';
  tagCategory?: Maybe<TagCategory>;
};

export type GetTagResult = {
  __typename?: 'GetTagResult';
  tag?: Maybe<Tag>;
};

export enum GetTagsError {
  TAG_CATEGORY_NOT_FOUND = 'TAG_CATEGORY_NOT_FOUND',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type GetTagsResult = {
  __typename?: 'GetTagsResult';
  error?: Maybe<GetTagsError>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  totalCount: Scalars['Int']['output'];
};

export type GetUsersResult = {
  __typename?: 'GetUsersResult';
  totalCount: Scalars['Int']['output'];
  users: Array<User>;
};

export enum GetWarehouseInfoError {
  INVALID_WAREHOUSE_ID = 'INVALID_WAREHOUSE_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  WAREHOUSE_NOT_FOUND = 'WAREHOUSE_NOT_FOUND'
}

export type GetWarehouseInfoInput = {
  id: Scalars['Int']['input'];
  providerCompanyId: Scalars['String']['input'];
};

export type GetWarehouseInfoResult = {
  __typename?: 'GetWarehouseInfoResult';
  error?: Maybe<GetWarehouseInfoError>;
  warehouse?: Maybe<Warehouse>;
};

export enum GetWarehousesForCompanyError {
  INVALID_COMPANY_ID = 'INVALID_COMPANY_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type GetWarehousesForCompanyInput = {
  companyId: Scalars['String']['input'];
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type GetWarehousesForCompanyResult = {
  __typename?: 'GetWarehousesForCompanyResult';
  error?: Maybe<GetWarehousesForCompanyError>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  warehouses?: Maybe<Array<Maybe<Warehouse>>>;
};

export type GrowingSeason = {
  __typename?: 'GrowingSeason';
  crop?: Maybe<Tag>;
  cropId?: Maybe<Scalars['Int']['output']>;
  cropYear?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  harvestDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  plantingDate?: Maybe<Scalars['DateTime']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  yield?: Maybe<Scalars['Float']['output']>;
  yieldGoal?: Maybe<Scalars['Float']['output']>;
  yieldGoalMeasurement?: Maybe<UnitOfMeasurement>;
  yieldMeasurement?: Maybe<UnitOfMeasurement>;
};

export type GrowingSeasonInput = {
  cropId?: InputMaybe<Scalars['Int']['input']>;
  cropYear?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  harvestDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plantingDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  yield?: InputMaybe<Scalars['Float']['input']>;
  yieldGoal?: InputMaybe<Scalars['Float']['input']>;
  yieldGoalMeasurementId?: InputMaybe<Scalars['Int']['input']>;
  yieldMeasurementId?: InputMaybe<Scalars['Int']['input']>;
};

export type InviteUsersInput = {
  companyId: Scalars['String']['input'];
  emails: Array<Scalars['String']['input']>;
  roleId: Scalars['Int']['input'];
};

export type LinkAccountToEnterpriseInput = {
  accountCompanyId: Scalars['String']['input'];
  enterpriseCompanyId: Scalars['String']['input'];
  extendedProperties?: InputMaybe<Scalars['JSON']['input']>;
  providerCompanyId: Scalars['String']['input'];
};

export type LinkAccountToEnterpriseResult = {
  __typename?: 'LinkAccountToEnterpriseResult';
  linkedRelationship: CompanyRelationship;
};

export type LinkCompaniesInput = {
  companyRelationshipExtendedProperties?: InputMaybe<Scalars['JSON']['input']>;
  companyRelationshipTags?: InputMaybe<Array<InputMaybe<TagLinkInput>>>;
  companyRelationshipType: CompanyRelationshipTypeEnum;
  extendedProperties?: InputMaybe<Scalars['JSON']['input']>;
  firstCompanyId: Scalars['String']['input'];
  secondCompanyId: Scalars['String']['input'];
};

export type LinkCompaniesResult = {
  __typename?: 'LinkCompaniesResult';
  linkedRelationship: CompanyRelationship;
};

export type Manufacturer = {
  __typename?: 'Manufacturer';
  companyName: Scalars['String']['output'];
  companyType?: Maybe<CompanyType>;
  companyTypeId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  homepage?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  productsCount?: Maybe<Scalars['Int']['output']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRole: Role;
  addUserRole: AddOrUpdateUserRoleResult;
  createCompany: Company;
  createField?: Maybe<EnterpriseField>;
  createRelatedCompany: CreateRelatedCompanyResult;
  createRetailerProduct: CreateRetailerProductResult;
  createStorageLocation: CreateStorageLocationResult;
  createTag: CreateTagResult;
  createTagCategory: CreateTagCategoryResult;
  createUser: User;
  createWarehouse: CreateWarehouseResult;
  deleteStorageLocation: DeleteStorageLocationResult;
  deleteUserRole: DeleteUserRoleResult;
  deleteWarehouses: DeleteWarehousesResult;
  inviteUsers: SendInvitesResult;
  linkAccountToEnterprise: LinkAccountToEnterpriseResult;
  linkCompanies: LinkCompaniesResult;
  registerUserWithCompany: User;
  removeAccountLinkFromEnterprise: RemoveAccountLinkFromEnterpriseResult;
  unlinkCompanies: UnlinkCompaniesResult;
  updateRetailerProduct: UpdateRetailerProductResult;
  updateStorageLocation: UpdateStorageLocationResult;
  updateTag: UpdateTagResult;
  updateTagCategory: UpdateTagCategoryResult;
  updateUserProfile?: Maybe<User>;
  updateUserRole: AddOrUpdateUserRoleResult;
  updateWarehouse: UpdateWarehouseResult;
};


export type MutationAddRoleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddUserRoleArgs = {
  input?: InputMaybe<UserRoleInput>;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateFieldArgs = {
  input?: InputMaybe<CreateFieldInput>;
};


export type MutationCreateRelatedCompanyArgs = {
  input: CreateRelatedCompanyInput;
};


export type MutationCreateRetailerProductArgs = {
  input?: InputMaybe<CreateRetailerProductInput>;
};


export type MutationCreateStorageLocationArgs = {
  input?: InputMaybe<CreateStorageLocationInput>;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateTagCategoryArgs = {
  input: CreateTagCategoryInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWarehouseArgs = {
  input: CreateWarehouseInput;
};


export type MutationDeleteStorageLocationArgs = {
  input: DeleteStorageLocationInput;
};


export type MutationDeleteUserRoleArgs = {
  input?: InputMaybe<UserRoleInput>;
};


export type MutationDeleteWarehousesArgs = {
  input: DeleteWarehousesInput;
};


export type MutationInviteUsersArgs = {
  input?: InputMaybe<InviteUsersInput>;
};


export type MutationLinkAccountToEnterpriseArgs = {
  input: LinkAccountToEnterpriseInput;
};


export type MutationLinkCompaniesArgs = {
  input: LinkCompaniesInput;
};


export type MutationRegisterUserWithCompanyArgs = {
  input?: InputMaybe<RegisterUserInput>;
};


export type MutationRemoveAccountLinkFromEnterpriseArgs = {
  input: RemoveAccountLinkFromEnterpriseInput;
};


export type MutationUnlinkCompaniesArgs = {
  input: UnlinkCompaniesInput;
};


export type MutationUpdateRetailerProductArgs = {
  input?: InputMaybe<UpdateRetailerProductInput>;
};


export type MutationUpdateStorageLocationArgs = {
  input?: InputMaybe<UpdateStorageLocationInput>;
};


export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


export type MutationUpdateTagCategoryArgs = {
  input: UpdateTagCategoryInput;
};


export type MutationUpdateUserProfileArgs = {
  avatarData?: InputMaybe<AvatarData>;
  user?: InputMaybe<UserInput>;
  userAddress?: InputMaybe<UserAddressInput>;
  userPhoneNumber?: InputMaybe<UserPhoneNumberInput>;
  userSettings?: InputMaybe<UserSettingsInput>;
};


export type MutationUpdateUserRoleArgs = {
  input?: InputMaybe<UserRoleInput>;
};


export type MutationUpdateWarehouseArgs = {
  input: UpdateWarehouseInput;
};

export type NutrientRemovalRate = {
  __typename?: 'NutrientRemovalRate';
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  crop?: Maybe<Tag>;
  cropId?: Maybe<Scalars['Int']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['Int']['output'];
  isDryMatter: Scalars['Boolean']['output'];
  isSilage: Scalars['Boolean']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  nutrient?: Maybe<Tag>;
  nutrientId?: Maybe<Scalars['Int']['output']>;
  removalRateUnit?: Maybe<UnitOfMeasurement>;
  removalRateUnitId?: Maybe<Scalars['Int']['output']>;
  removalRateValue?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  waterPercentage: Scalars['Float']['output'];
  year?: Maybe<Tag>;
  yearId?: Maybe<Scalars['Int']['output']>;
};

export type PaymentTerm = {
  __typename?: 'PaymentTerm';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountDays?: Maybe<Scalars['Int']['output']>;
  discountPercent?: Maybe<Scalars['Float']['output']>;
  dueDays: Scalars['Int']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  paymentTerm: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PhoneNumberInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberType: PhoneNumberType;
};

export enum PhoneNumberType {
  HOME = 'HOME',
  MOBILE = 'MOBILE',
  OTHER = 'OTHER',
  WORK = 'WORK'
}

export type Product = {
  __typename?: 'Product';
  EPA?: Maybe<Scalars['String']['output']>;
  commonName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  externalId: Scalars['Int']['output'];
  gaPageParam?: Maybe<Scalars['String']['output']>;
  hasIcon?: Maybe<Scalars['Boolean']['output']>;
  iconUI?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isCanada?: Maybe<Scalars['Boolean']['output']>;
  isCoPack?: Maybe<Scalars['Boolean']['output']>;
  isUs?: Maybe<Scalars['Boolean']['output']>;
  labelDAT?: Maybe<Scalars['String']['output']>;
  logoId?: Maybe<Scalars['Int']['output']>;
  manId?: Maybe<Scalars['Int']['output']>;
  manufacturer?: Maybe<Manufacturer>;
  manufacturerId?: Maybe<Scalars['String']['output']>;
  manufacturerName?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAccountEnterpriseItems?: Maybe<Array<Maybe<EnterpriseField>>>;
  getAllCompanyTypes: Array<CompanyType>;
  getAvailableRoles: Array<Role>;
  getAvailableUnitsOfMeasurement: Array<UnitOfMeasurement>;
  getCompanies: GetCompaniesResult;
  getCompany?: Maybe<Company>;
  getCompanyOrCreate?: Maybe<Company>;
  getField?: Maybe<EnterpriseField>;
  getFieldsForCompany?: Maybe<Array<Maybe<EnterpriseField>>>;
  getManufacturerProducts: GetManufacturerProductsResult;
  getManufacturers: GetManufacturersResult;
  getNutrientRemovalRate?: Maybe<NutrientRemovalRate>;
  getNutrientRemovalRates: GetNutrientRemovalsRateResult;
  getPaymentTerms: GetPaymentTermsResult;
  getRelatedCompanies: GetRelatedCompaniesResult;
  getRelatedCompany: GetRelatedCompanyResult;
  getRetailerProducts: GetRetailerProductsResult;
  getStorageLocationById?: Maybe<StorageLocation>;
  getStorageLocations: GetStorageLocationsResult;
  getSubsidiaryCompanies: GetCompaniesResult;
  getSubsidiaryCompaniesTree: GetCompaniesResult;
  getTag: GetTagResult;
  getTagCategories: GetTagCategoriesResult;
  getTagCategory: GetTagCategoryResult;
  getTags: GetTagsResult;
  getUserByExternalId?: Maybe<User>;
  getUserByUserId?: Maybe<User>;
  getUserOrCreate?: Maybe<User>;
  getUsers: GetUsersResult;
  getUsersWithRolesInCompany: GetUsersResult;
  getWarehouseInfo: GetWarehouseInfoResult;
  getWarehousesForCompany: GetWarehousesForCompanyResult;
};


export type QueryGetAccountEnterpriseItemsArgs = {
  input: GetAccountEnterpriseItemsInput;
};


export type QueryGetCompaniesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCompanyArgs = {
  companyId?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFieldArgs = {
  input?: InputMaybe<GetFieldInput>;
};


export type QueryGetFieldsForCompanyArgs = {
  input?: InputMaybe<GetFieldsForCompanyInput>;
};


export type QueryGetManufacturerProductsArgs = {
  companyId: Scalars['String']['input'];
  manufacturerId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetManufacturersArgs = {
  companyId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetNutrientRemovalRateArgs = {
  nutrientRemovalRateId: Scalars['Int']['input'];
};


export type QueryGetNutrientRemovalRatesArgs = {
  companyId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPaymentTermsArgs = {
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetRelatedCompaniesArgs = {
  companyId: Scalars['String']['input'];
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  relationshipType: CompanyRelationshipTypeEnum;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  tagFilters?: InputMaybe<Array<InputMaybe<TagFilterInput>>>;
};


export type QueryGetRelatedCompanyArgs = {
  companyId: Scalars['String']['input'];
  companyRelationshipType: CompanyRelationshipTypeEnum;
  relatedCompanyId: Scalars['String']['input'];
};


export type QueryGetRetailerProductsArgs = {
  companyId: Scalars['String']['input'];
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  tagFilters?: InputMaybe<Array<InputMaybe<TagFilterInput>>>;
};


export type QueryGetStorageLocationByIdArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetStorageLocationsArgs = {
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  tagFilters?: InputMaybe<Array<InputMaybe<TagFilterInput>>>;
  warehouseId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetSubsidiaryCompaniesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  parentCompanyId: Scalars['String']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSubsidiaryCompaniesTreeArgs = {
  input?: InputMaybe<GetSubsidiaryCompaniesTreeInput>;
};


export type QueryGetTagArgs = {
  tagCategoryId?: InputMaybe<Scalars['Int']['input']>;
  tagName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTagCategoriesArgs = {
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTagCategoryArgs = {
  tagCategoryName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTagsArgs = {
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  tagCategoryName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserByExternalIdArgs = {
  externalId: Scalars['String']['input'];
};


export type QueryGetUserByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUsersArgs = {
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUsersWithRolesInCompanyArgs = {
  companyId: Scalars['String']['input'];
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetWarehouseInfoArgs = {
  input: GetWarehouseInfoInput;
};


export type QueryGetWarehousesForCompanyArgs = {
  input: GetWarehousesForCompanyInput;
};

export type RegisterUserInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyName: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  darkMode?: InputMaybe<Scalars['Boolean']['input']>;
  parentCompanyId?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type RelatedCompany = {
  __typename?: 'RelatedCompany';
  companyRelationship?: Maybe<CompanyRelationship>;
  companyRelationshipDirection?: Maybe<CompanyRelationshipDirection>;
  companyRelationshipId?: Maybe<Scalars['String']['output']>;
  companyRelationshipType: CompanyRelationshipType;
  companyRelationshipTypeId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstCompanyId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  secondCompany?: Maybe<Company>;
  secondCompanyId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RemoveAccountLinkFromEnterpriseInput = {
  accountCompanyId: Scalars['String']['input'];
  enterpriseCompanyId: Scalars['String']['input'];
  providerCompanyId: Scalars['String']['input'];
};

export type RemoveAccountLinkFromEnterpriseResult = {
  __typename?: 'RemoveAccountLinkFromEnterpriseResult';
  removedRelationship: CompanyRelationship;
};

export type RetailerProduct = {
  __typename?: 'RetailerProduct';
  company?: Maybe<Company>;
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  productBrochureUrl?: Maybe<Scalars['String']['output']>;
  productImageUrl?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  productSku: Scalars['String']['output'];
  retailerProductComponents?: Maybe<Array<Maybe<RetailerProductComponent>>>;
  retailerProductTags?: Maybe<Array<Maybe<RetailerProductTag>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RetailerProductComponent = {
  __typename?: 'RetailerProductComponent';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  measurementValue: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['Int']['output'];
  retailerProductId: Scalars['Int']['output'];
  unitOfMeasurement?: Maybe<UnitOfMeasurement>;
  unitOfMeasurementId: Scalars['Int']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RetailerProductComponentInput = {
  measurementValue: Scalars['Float']['input'];
  productId: Scalars['Int']['input'];
  unitOfMeasurementId: Scalars['Int']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type RetailerProductTag = {
  __typename?: 'RetailerProductTag';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  retailerProductId: Scalars['Int']['output'];
  tag?: Maybe<Tag>;
  tagId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  permissions: Array<RolePermission>;
  roleName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RolePermission = {
  __typename?: 'RolePermission';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  permissionName: Scalars['String']['output'];
  roleId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SendInvitesResult = {
  __typename?: 'SendInvitesResult';
  failedEmails?: Maybe<Array<Scalars['String']['output']>>;
  success: Scalars['Boolean']['output'];
};

export type StorageLocation = {
  __typename?: 'StorageLocation';
  barcode?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Maybe<StorageLocation>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<StorageLocation>;
  parentId?: Maybe<Scalars['Int']['output']>;
  storageType?: Maybe<Tag>;
  storageTypeId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse?: Maybe<Warehouse>;
  warehouseId?: Maybe<Scalars['Int']['output']>;
};

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['String']['output']>;
  colorIndex?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  tagCategory?: Maybe<TagCategory>;
  tagCategoryId?: Maybe<Scalars['Int']['output']>;
  tagName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TagCategory = {
  __typename?: 'TagCategory';
  color?: Maybe<Scalars['String']['output']>;
  colorIndex?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  tagCategoryName: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Tag>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TagFilterInput = {
  tagCategoryName?: InputMaybe<Scalars['String']['input']>;
  tagName?: InputMaybe<Scalars['String']['input']>;
};

export type TagInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  tagCategoryName: Scalars['String']['input'];
  tagName: Scalars['String']['input'];
};

export type TagLinkInput = {
  tagCategoryName: Scalars['String']['input'];
  tagName: Scalars['String']['input'];
};

export type UnitOfMeasurement = {
  __typename?: 'UnitOfMeasurement';
  baseUnit?: Maybe<UnitOfMeasurement>;
  baseUnitId?: Maybe<Scalars['Int']['output']>;
  colorIndex?: Maybe<Scalars['Int']['output']>;
  conversionFactor?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  denominatorMultiplier?: Maybe<Scalars['Float']['output']>;
  denominatorUnit?: Maybe<UnitOfMeasurement>;
  denominatorUnitId?: Maybe<Scalars['Int']['output']>;
  denominatorUnitType?: Maybe<UnitOfMeasurementType>;
  derivedUnits?: Maybe<Array<Maybe<UnitOfMeasurement>>>;
  id: Scalars['Int']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  numeratorMultiplier?: Maybe<Scalars['Float']['output']>;
  numeratorUnit?: Maybe<UnitOfMeasurement>;
  numeratorUnitId?: Maybe<Scalars['Int']['output']>;
  numeratorUnitType?: Maybe<UnitOfMeasurementType>;
  pluralName?: Maybe<Scalars['String']['output']>;
  singularName?: Maybe<Scalars['String']['output']>;
  unitName: Scalars['String']['output'];
  unitOfMeasurementType?: Maybe<UnitOfMeasurementType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum UnitOfMeasurementType {
  AREA = 'AREA',
  COUNT = 'COUNT',
  LENGTH = 'LENGTH',
  RATE = 'RATE',
  VOLUME = 'VOLUME',
  WEIGHT = 'WEIGHT'
}

export type UnlinkCompaniesInput = {
  companyRelationshipType: CompanyRelationshipTypeEnum;
  firstCompanyId: Scalars['String']['input'];
  secondCompanyId: Scalars['String']['input'];
};

export type UnlinkCompaniesResult = {
  __typename?: 'UnlinkCompaniesResult';
  unlinkedRelationship: CompanyRelationship;
};

export type UpdateRetailerProductInput = {
  componentsAdded?: InputMaybe<Array<InputMaybe<RetailerProductComponentInput>>>;
  componentsRemoved?: InputMaybe<Array<InputMaybe<RetailerProductComponentInput>>>;
  componentsUpdated?: InputMaybe<Array<InputMaybe<RetailerProductComponentInput>>>;
  label?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  productSku: Scalars['String']['input'];
  retailerCompanyId: Scalars['String']['input'];
  tagsAdded?: InputMaybe<Array<InputMaybe<TagInput>>>;
  tagsRemoved?: InputMaybe<Array<InputMaybe<TagInput>>>;
};

export type UpdateRetailerProductResult = {
  __typename?: 'UpdateRetailerProductResult';
  retailerProductId?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum UpdateStorageLocationError {
  INVALID_STORAGE_LOCATION_ID = 'INVALID_STORAGE_LOCATION_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type UpdateStorageLocationInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  identifier?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  storageTypeId: Scalars['Int']['input'];
  warehouseId: Scalars['Int']['input'];
};

export type UpdateStorageLocationResult = {
  __typename?: 'UpdateStorageLocationResult';
  error?: Maybe<UpdateStorageLocationError>;
  storageLocationId?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum UpdateTagCategoryError {
  TAG_CATEGORY_NOT_FOUND = 'TAG_CATEGORY_NOT_FOUND',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type UpdateTagCategoryInput = {
  tagCategoryName: Scalars['String']['input'];
  updatedColor?: InputMaybe<Scalars['String']['input']>;
  updatedColorIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTagCategoryResult = {
  __typename?: 'UpdateTagCategoryResult';
  error?: Maybe<UpdateTagCategoryError>;
  tagCategory?: Maybe<TagCategory>;
};

export enum UpdateTagError {
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_TAG_ID = 'INVALID_TAG_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type UpdateTagInput = {
  tagId: Scalars['Int']['input'];
  updatedColor?: InputMaybe<Scalars['String']['input']>;
  updatedColorIndex?: InputMaybe<Scalars['Int']['input']>;
  updatedDescription?: InputMaybe<Scalars['String']['input']>;
  updatedTagName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagResult = {
  __typename?: 'UpdateTagResult';
  error?: Maybe<UpdateTagError>;
  tag?: Maybe<Tag>;
};

export enum UpdateWarehouseError {
  INVALID_WAREHOUSE_ID = 'INVALID_WAREHOUSE_ID',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export type UpdateWarehouseInput = {
  id: Scalars['Int']['input'];
  providerCompanyId: Scalars['String']['input'];
  updatedAddress?: InputMaybe<AddressInput>;
  updatedName?: InputMaybe<Scalars['String']['input']>;
  updatedNotes?: InputMaybe<Scalars['String']['input']>;
  updatedPhoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWarehouseResult = {
  __typename?: 'UpdateWarehouseResult';
  error?: Maybe<UpdateWarehouseError>;
  warehouse?: Maybe<Warehouse>;
};

export type User = {
  __typename?: 'User';
  addresses?: Maybe<Array<Maybe<UserAddress>>>;
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  externalId?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  phoneNumbers?: Maybe<Array<Maybe<UserPhoneNumber>>>;
  roleCount: Scalars['Int']['output'];
  settings?: Maybe<UserSettings>;
  updatedAt: Scalars['DateTime']['output'];
  userRoles?: Maybe<Array<Maybe<UserRole>>>;
};

export type UserAddress = {
  __typename?: 'UserAddress';
  address?: Maybe<Address>;
  addressId: Scalars['Int']['output'];
  addressType: AddressType;
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type UserAddressInput = {
  address?: InputMaybe<AddressDetailsInput>;
  addressId?: InputMaybe<Scalars['Int']['input']>;
  addressType: Scalars['String']['input'];
};

export type UserInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserPhoneNumber = {
  __typename?: 'UserPhoneNumber';
  createdAt: Scalars['DateTime']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberType: PhoneNumberType;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type UserPhoneNumberInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberId?: InputMaybe<Scalars['Int']['input']>;
  phoneNumberType: Scalars['String']['input'];
};

export type UserRole = {
  __typename?: 'UserRole';
  company?: Maybe<Company>;
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  extendedProperties?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['String']['output'];
  role?: Maybe<Role>;
  roleId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type UserRoleInput = {
  acl?: InputMaybe<Scalars['String']['input']>;
  companyId: Scalars['String']['input'];
  extendedProperties?: InputMaybe<Scalars['JSON']['input']>;
  roleId: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  additionalSettings?: Maybe<Scalars['JSON']['output']>;
  avatarFallbackImage?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  darkMode?: Maybe<Scalars['String']['output']>;
  selectedUserRole?: Maybe<UserRole>;
  selectedUserRoleId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type UserSettingsInput = {
  additionalSettings?: InputMaybe<Scalars['String']['input']>;
  avatarFallbackImage?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  darkMode?: InputMaybe<Scalars['Boolean']['input']>;
  selectedUserRoleId?: InputMaybe<Scalars['String']['input']>;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  address?: Maybe<Address>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  warehouseName?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountEnterpriseItems: ResolverTypeWrapper<AccountEnterpriseItems>;
  AddOrUpdateUserRoleResult: ResolverTypeWrapper<AddOrUpdateUserRoleResult>;
  Address: ResolverTypeWrapper<Address>;
  AddressDetailsInput: AddressDetailsInput;
  AddressInput: AddressInput;
  AddressType: AddressType;
  AvatarData: AvatarData;
  BillingAccountSplitAllocation: ResolverTypeWrapper<BillingAccountSplitAllocation>;
  BillingSplitGroup: ResolverTypeWrapper<BillingSplitGroup>;
  BillingSplitGroupAccount: ResolverTypeWrapper<BillingSplitGroupAccount>;
  BillingSplitInput: BillingSplitInput;
  BillingSplitItem: ResolverTypeWrapper<BillingSplitItem>;
  BillingSplitValueType: BillingSplitValueType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Companies: ResolverTypeWrapper<Companies>;
  Company: ResolverTypeWrapper<Company>;
  CompanyAddress: ResolverTypeWrapper<CompanyAddress>;
  CompanyBasicInfo: ResolverTypeWrapper<CompanyBasicInfo>;
  CompanyPhoneNumber: ResolverTypeWrapper<CompanyPhoneNumber>;
  CompanyRelationship: ResolverTypeWrapper<CompanyRelationship>;
  CompanyRelationshipDirection: CompanyRelationshipDirection;
  CompanyRelationshipStatus: CompanyRelationshipStatus;
  CompanyRelationshipTag: ResolverTypeWrapper<CompanyRelationshipTag>;
  CompanyRelationshipType: ResolverTypeWrapper<CompanyRelationshipType>;
  CompanyRelationshipTypeEnum: CompanyRelationshipTypeEnum;
  CompanySaaSFeature: ResolverTypeWrapper<CompanySaaSFeature>;
  CompanyServiceAccount: ResolverTypeWrapper<CompanyServiceAccount>;
  CompanyTag: ResolverTypeWrapper<CompanyTag>;
  CompanyType: ResolverTypeWrapper<CompanyType>;
  ContactPersonInput: ContactPersonInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerResult: ResolverTypeWrapper<CreateCustomerResult>;
  CreateFieldInput: CreateFieldInput;
  CreateRelatedCompanyInput: CreateRelatedCompanyInput;
  CreateRelatedCompanyResult: ResolverTypeWrapper<CreateRelatedCompanyResult>;
  CreateRetailerProductInput: CreateRetailerProductInput;
  CreateRetailerProductResult: ResolverTypeWrapper<CreateRetailerProductResult>;
  CreateStorageLocationInput: CreateStorageLocationInput;
  CreateStorageLocationResult: ResolverTypeWrapper<CreateStorageLocationResult>;
  CreateTagCategoryError: CreateTagCategoryError;
  CreateTagCategoryInput: CreateTagCategoryInput;
  CreateTagCategoryResult: ResolverTypeWrapper<CreateTagCategoryResult>;
  CreateTagError: CreateTagError;
  CreateTagInput: CreateTagInput;
  CreateTagResult: ResolverTypeWrapper<CreateTagResult>;
  CreateUserInput: CreateUserInput;
  CreateWarehouseError: CreateWarehouseError;
  CreateWarehouseInput: CreateWarehouseInput;
  CreateWarehouseResult: ResolverTypeWrapper<CreateWarehouseResult>;
  Customer: ResolverTypeWrapper<Customer>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteStorageLocationError: DeleteStorageLocationError;
  DeleteStorageLocationInput: DeleteStorageLocationInput;
  DeleteStorageLocationResult: ResolverTypeWrapper<DeleteStorageLocationResult>;
  DeleteUserRoleResult: ResolverTypeWrapper<DeleteUserRoleResult>;
  DeleteWarehousesError: DeleteWarehousesError;
  DeleteWarehousesInput: DeleteWarehousesInput;
  DeleteWarehousesResult: ResolverTypeWrapper<DeleteWarehousesResult>;
  EnterpriseField: ResolverTypeWrapper<EnterpriseField>;
  EnterpriseItem: ResolverTypeWrapper<EnterpriseItem>;
  FieldInfo: ResolverTypeWrapper<FieldInfo>;
  FieldLayer: ResolverTypeWrapper<FieldLayer>;
  FieldLayerZone: ResolverTypeWrapper<FieldLayerZone>;
  FieldTag: ResolverTypeWrapper<FieldTag>;
  FieldVersion: ResolverTypeWrapper<FieldVersion>;
  FieldVersionTag: ResolverTypeWrapper<FieldVersionTag>;
  FilterInput: FilterInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GeoLocation: ResolverTypeWrapper<GeoLocation>;
  GeoLocationInput: GeoLocationInput;
  GetAccountEnterpriseItemsInput: GetAccountEnterpriseItemsInput;
  GetCompaniesResult: ResolverTypeWrapper<GetCompaniesResult>;
  GetCustomerResult: ResolverTypeWrapper<GetCustomerResult>;
  GetCustomersResult: ResolverTypeWrapper<GetCustomersResult>;
  GetFieldInput: GetFieldInput;
  GetFieldsForCompanyInput: GetFieldsForCompanyInput;
  GetManufacturerProductsResult: ResolverTypeWrapper<GetManufacturerProductsResult>;
  GetManufacturersResult: ResolverTypeWrapper<GetManufacturersResult>;
  GetNutrientRemovalsRateResult: ResolverTypeWrapper<GetNutrientRemovalsRateResult>;
  GetPaymentTermsResult: ResolverTypeWrapper<GetPaymentTermsResult>;
  GetRelatedCompaniesResult: ResolverTypeWrapper<GetRelatedCompaniesResult>;
  GetRelatedCompanyResult: ResolverTypeWrapper<GetRelatedCompanyResult>;
  GetRetailerProductResult: ResolverTypeWrapper<GetRetailerProductResult>;
  GetRetailerProductsResult: ResolverTypeWrapper<GetRetailerProductsResult>;
  GetStorageLocationResult: ResolverTypeWrapper<GetStorageLocationResult>;
  GetStorageLocationsResult: ResolverTypeWrapper<GetStorageLocationsResult>;
  GetSubsidiaryCompaniesTreeInput: GetSubsidiaryCompaniesTreeInput;
  GetTagCategoriesResult: ResolverTypeWrapper<GetTagCategoriesResult>;
  GetTagCategoryResult: ResolverTypeWrapper<GetTagCategoryResult>;
  GetTagResult: ResolverTypeWrapper<GetTagResult>;
  GetTagsError: GetTagsError;
  GetTagsResult: ResolverTypeWrapper<GetTagsResult>;
  GetUsersResult: ResolverTypeWrapper<GetUsersResult>;
  GetWarehouseInfoError: GetWarehouseInfoError;
  GetWarehouseInfoInput: GetWarehouseInfoInput;
  GetWarehouseInfoResult: ResolverTypeWrapper<GetWarehouseInfoResult>;
  GetWarehousesForCompanyError: GetWarehousesForCompanyError;
  GetWarehousesForCompanyInput: GetWarehousesForCompanyInput;
  GetWarehousesForCompanyResult: ResolverTypeWrapper<GetWarehousesForCompanyResult>;
  GrowingSeason: ResolverTypeWrapper<GrowingSeason>;
  GrowingSeasonInput: GrowingSeasonInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InviteUsersInput: InviteUsersInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LinkAccountToEnterpriseInput: LinkAccountToEnterpriseInput;
  LinkAccountToEnterpriseResult: ResolverTypeWrapper<LinkAccountToEnterpriseResult>;
  LinkCompaniesInput: LinkCompaniesInput;
  LinkCompaniesResult: ResolverTypeWrapper<LinkCompaniesResult>;
  Manufacturer: ResolverTypeWrapper<Manufacturer>;
  Mutation: ResolverTypeWrapper<{}>;
  NutrientRemovalRate: ResolverTypeWrapper<NutrientRemovalRate>;
  PaymentTerm: ResolverTypeWrapper<PaymentTerm>;
  PhoneNumberInput: PhoneNumberInput;
  PhoneNumberType: PhoneNumberType;
  Product: ResolverTypeWrapper<Product>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  RelatedCompany: ResolverTypeWrapper<RelatedCompany>;
  RemoveAccountLinkFromEnterpriseInput: RemoveAccountLinkFromEnterpriseInput;
  RemoveAccountLinkFromEnterpriseResult: ResolverTypeWrapper<RemoveAccountLinkFromEnterpriseResult>;
  RetailerProduct: ResolverTypeWrapper<RetailerProduct>;
  RetailerProductComponent: ResolverTypeWrapper<RetailerProductComponent>;
  RetailerProductComponentInput: RetailerProductComponentInput;
  RetailerProductTag: ResolverTypeWrapper<RetailerProductTag>;
  Role: ResolverTypeWrapper<Role>;
  RolePermission: ResolverTypeWrapper<RolePermission>;
  SendInvitesResult: ResolverTypeWrapper<SendInvitesResult>;
  StorageLocation: ResolverTypeWrapper<StorageLocation>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagCategory: ResolverTypeWrapper<TagCategory>;
  TagFilterInput: TagFilterInput;
  TagInput: TagInput;
  TagLinkInput: TagLinkInput;
  UnitOfMeasurement: ResolverTypeWrapper<UnitOfMeasurement>;
  UnitOfMeasurementType: UnitOfMeasurementType;
  UnlinkCompaniesInput: UnlinkCompaniesInput;
  UnlinkCompaniesResult: ResolverTypeWrapper<UnlinkCompaniesResult>;
  UpdateRetailerProductInput: UpdateRetailerProductInput;
  UpdateRetailerProductResult: ResolverTypeWrapper<UpdateRetailerProductResult>;
  UpdateStorageLocationError: UpdateStorageLocationError;
  UpdateStorageLocationInput: UpdateStorageLocationInput;
  UpdateStorageLocationResult: ResolverTypeWrapper<UpdateStorageLocationResult>;
  UpdateTagCategoryError: UpdateTagCategoryError;
  UpdateTagCategoryInput: UpdateTagCategoryInput;
  UpdateTagCategoryResult: ResolverTypeWrapper<UpdateTagCategoryResult>;
  UpdateTagError: UpdateTagError;
  UpdateTagInput: UpdateTagInput;
  UpdateTagResult: ResolverTypeWrapper<UpdateTagResult>;
  UpdateWarehouseError: UpdateWarehouseError;
  UpdateWarehouseInput: UpdateWarehouseInput;
  UpdateWarehouseResult: ResolverTypeWrapper<UpdateWarehouseResult>;
  User: ResolverTypeWrapper<User>;
  UserAddress: ResolverTypeWrapper<UserAddress>;
  UserAddressInput: UserAddressInput;
  UserInput: UserInput;
  UserPhoneNumber: ResolverTypeWrapper<UserPhoneNumber>;
  UserPhoneNumberInput: UserPhoneNumberInput;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserRoleInput: UserRoleInput;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  UserSettingsInput: UserSettingsInput;
  Warehouse: ResolverTypeWrapper<Warehouse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountEnterpriseItems: AccountEnterpriseItems;
  AddOrUpdateUserRoleResult: AddOrUpdateUserRoleResult;
  Address: Address;
  AddressDetailsInput: AddressDetailsInput;
  AddressInput: AddressInput;
  AvatarData: AvatarData;
  BillingAccountSplitAllocation: BillingAccountSplitAllocation;
  BillingSplitGroup: BillingSplitGroup;
  BillingSplitGroupAccount: BillingSplitGroupAccount;
  BillingSplitInput: BillingSplitInput;
  BillingSplitItem: BillingSplitItem;
  Boolean: Scalars['Boolean']['output'];
  Companies: Companies;
  Company: Company;
  CompanyAddress: CompanyAddress;
  CompanyBasicInfo: CompanyBasicInfo;
  CompanyPhoneNumber: CompanyPhoneNumber;
  CompanyRelationship: CompanyRelationship;
  CompanyRelationshipTag: CompanyRelationshipTag;
  CompanyRelationshipType: CompanyRelationshipType;
  CompanySaaSFeature: CompanySaaSFeature;
  CompanyServiceAccount: CompanyServiceAccount;
  CompanyTag: CompanyTag;
  CompanyType: CompanyType;
  ContactPersonInput: ContactPersonInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerResult: CreateCustomerResult;
  CreateFieldInput: CreateFieldInput;
  CreateRelatedCompanyInput: CreateRelatedCompanyInput;
  CreateRelatedCompanyResult: CreateRelatedCompanyResult;
  CreateRetailerProductInput: CreateRetailerProductInput;
  CreateRetailerProductResult: CreateRetailerProductResult;
  CreateStorageLocationInput: CreateStorageLocationInput;
  CreateStorageLocationResult: CreateStorageLocationResult;
  CreateTagCategoryInput: CreateTagCategoryInput;
  CreateTagCategoryResult: CreateTagCategoryResult;
  CreateTagInput: CreateTagInput;
  CreateTagResult: CreateTagResult;
  CreateUserInput: CreateUserInput;
  CreateWarehouseInput: CreateWarehouseInput;
  CreateWarehouseResult: CreateWarehouseResult;
  Customer: Customer;
  DateTime: Scalars['DateTime']['output'];
  DeleteStorageLocationInput: DeleteStorageLocationInput;
  DeleteStorageLocationResult: DeleteStorageLocationResult;
  DeleteUserRoleResult: DeleteUserRoleResult;
  DeleteWarehousesInput: DeleteWarehousesInput;
  DeleteWarehousesResult: DeleteWarehousesResult;
  EnterpriseField: EnterpriseField;
  EnterpriseItem: EnterpriseItem;
  FieldInfo: FieldInfo;
  FieldLayer: FieldLayer;
  FieldLayerZone: FieldLayerZone;
  FieldTag: FieldTag;
  FieldVersion: FieldVersion;
  FieldVersionTag: FieldVersionTag;
  FilterInput: FilterInput;
  Float: Scalars['Float']['output'];
  GeoLocation: GeoLocation;
  GeoLocationInput: GeoLocationInput;
  GetAccountEnterpriseItemsInput: GetAccountEnterpriseItemsInput;
  GetCompaniesResult: GetCompaniesResult;
  GetCustomerResult: GetCustomerResult;
  GetCustomersResult: GetCustomersResult;
  GetFieldInput: GetFieldInput;
  GetFieldsForCompanyInput: GetFieldsForCompanyInput;
  GetManufacturerProductsResult: GetManufacturerProductsResult;
  GetManufacturersResult: GetManufacturersResult;
  GetNutrientRemovalsRateResult: GetNutrientRemovalsRateResult;
  GetPaymentTermsResult: GetPaymentTermsResult;
  GetRelatedCompaniesResult: GetRelatedCompaniesResult;
  GetRelatedCompanyResult: GetRelatedCompanyResult;
  GetRetailerProductResult: GetRetailerProductResult;
  GetRetailerProductsResult: GetRetailerProductsResult;
  GetStorageLocationResult: GetStorageLocationResult;
  GetStorageLocationsResult: GetStorageLocationsResult;
  GetSubsidiaryCompaniesTreeInput: GetSubsidiaryCompaniesTreeInput;
  GetTagCategoriesResult: GetTagCategoriesResult;
  GetTagCategoryResult: GetTagCategoryResult;
  GetTagResult: GetTagResult;
  GetTagsResult: GetTagsResult;
  GetUsersResult: GetUsersResult;
  GetWarehouseInfoInput: GetWarehouseInfoInput;
  GetWarehouseInfoResult: GetWarehouseInfoResult;
  GetWarehousesForCompanyInput: GetWarehousesForCompanyInput;
  GetWarehousesForCompanyResult: GetWarehousesForCompanyResult;
  GrowingSeason: GrowingSeason;
  GrowingSeasonInput: GrowingSeasonInput;
  Int: Scalars['Int']['output'];
  InviteUsersInput: InviteUsersInput;
  JSON: Scalars['JSON']['output'];
  LinkAccountToEnterpriseInput: LinkAccountToEnterpriseInput;
  LinkAccountToEnterpriseResult: LinkAccountToEnterpriseResult;
  LinkCompaniesInput: LinkCompaniesInput;
  LinkCompaniesResult: LinkCompaniesResult;
  Manufacturer: Manufacturer;
  Mutation: {};
  NutrientRemovalRate: NutrientRemovalRate;
  PaymentTerm: PaymentTerm;
  PhoneNumberInput: PhoneNumberInput;
  Product: Product;
  Query: {};
  RegisterUserInput: RegisterUserInput;
  RelatedCompany: RelatedCompany;
  RemoveAccountLinkFromEnterpriseInput: RemoveAccountLinkFromEnterpriseInput;
  RemoveAccountLinkFromEnterpriseResult: RemoveAccountLinkFromEnterpriseResult;
  RetailerProduct: RetailerProduct;
  RetailerProductComponent: RetailerProductComponent;
  RetailerProductComponentInput: RetailerProductComponentInput;
  RetailerProductTag: RetailerProductTag;
  Role: Role;
  RolePermission: RolePermission;
  SendInvitesResult: SendInvitesResult;
  StorageLocation: StorageLocation;
  String: Scalars['String']['output'];
  Tag: Tag;
  TagCategory: TagCategory;
  TagFilterInput: TagFilterInput;
  TagInput: TagInput;
  TagLinkInput: TagLinkInput;
  UnitOfMeasurement: UnitOfMeasurement;
  UnlinkCompaniesInput: UnlinkCompaniesInput;
  UnlinkCompaniesResult: UnlinkCompaniesResult;
  UpdateRetailerProductInput: UpdateRetailerProductInput;
  UpdateRetailerProductResult: UpdateRetailerProductResult;
  UpdateStorageLocationInput: UpdateStorageLocationInput;
  UpdateStorageLocationResult: UpdateStorageLocationResult;
  UpdateTagCategoryInput: UpdateTagCategoryInput;
  UpdateTagCategoryResult: UpdateTagCategoryResult;
  UpdateTagInput: UpdateTagInput;
  UpdateTagResult: UpdateTagResult;
  UpdateWarehouseInput: UpdateWarehouseInput;
  UpdateWarehouseResult: UpdateWarehouseResult;
  User: User;
  UserAddress: UserAddress;
  UserAddressInput: UserAddressInput;
  UserInput: UserInput;
  UserPhoneNumber: UserPhoneNumber;
  UserPhoneNumberInput: UserPhoneNumberInput;
  UserRole: UserRole;
  UserRoleInput: UserRoleInput;
  UserSettings: UserSettings;
  UserSettingsInput: UserSettingsInput;
  Warehouse: Warehouse;
};

export type AccountEnterpriseItemsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountEnterpriseItems'] = ResolversParentTypes['AccountEnterpriseItems']> = {
  fields?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnterpriseField']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddOrUpdateUserRoleResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddOrUpdateUserRoleResult'] = ResolversParentTypes['AddOrUpdateUserRoleResult']> = {
  userRole?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  addressLine1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addressLine2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BillingAccountSplitAllocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BillingAccountSplitAllocation'] = ResolversParentTypes['BillingAccountSplitAllocation']> = {
  splitGroupAccountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  splitItemId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  splitValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  splitValueType?: Resolver<ResolversTypes['BillingSplitValueType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BillingSplitGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['BillingSplitGroup'] = ResolversParentTypes['BillingSplitGroup']> = {
  billingSplitGroupAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['BillingSplitGroupAccount']>>>, ParentType, ContextType>;
  defaultSplitItem?: Resolver<Maybe<ResolversTypes['BillingSplitItem']>, ParentType, ContextType>;
  defaultSplitItemId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  splitGroupName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  splitItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['BillingSplitItem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BillingSplitGroupAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['BillingSplitGroupAccount'] = ResolversParentTypes['BillingSplitGroupAccount']> = {
  accountCompany?: Resolver<Maybe<ResolversTypes['CompanyBasicInfo']>, ParentType, ContextType>;
  accountCompanyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  splitGroup?: Resolver<Maybe<ResolversTypes['BillingSplitGroup']>, ParentType, ContextType>;
  splitGroupId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BillingSplitItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['BillingSplitItem'] = ResolversParentTypes['BillingSplitItem']> = {
  accountSplitAllocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['BillingAccountSplitAllocation']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentSplitItemId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  splitGroupId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  splitTier?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompaniesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Companies'] = ResolversParentTypes['Companies']> = {
  company?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  usersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanyAddress']>>>, ParentType, ContextType>;
  childCompanies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType>;
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companySaaSFeature?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanySaaSFeature']>>>, ParentType, ContextType>;
  companyServiceAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanyServiceAccount']>>>, ParentType, ContextType>;
  companyShortName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanyTag']>>>, ParentType, ContextType>;
  companyType?: Resolver<Maybe<ResolversTypes['CompanyType']>, ParentType, ContextType>;
  companyTypeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  parentCompanyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanyPhoneNumber']>>>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyAddress'] = ResolversParentTypes['CompanyAddress']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  addressId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  addressType?: Resolver<ResolversTypes['AddressType'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyBasicInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyBasicInfo'] = ResolversParentTypes['CompanyBasicInfo']> = {
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyTypeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyPhoneNumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyPhoneNumber'] = ResolversParentTypes['CompanyPhoneNumber']> = {
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumberType?: Resolver<ResolversTypes['PhoneNumberType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyRelationship'] = ResolversParentTypes['CompanyRelationship']> = {
  companyRelationshipId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  companyRelationshipStatus?: Resolver<ResolversTypes['CompanyRelationshipStatus'], ParentType, ContextType>;
  companyRelationshipTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanyRelationshipTag']>>>, ParentType, ContextType>;
  companyRelationshipTypeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  firstCompanyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  secondCompanyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyRelationshipTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyRelationshipTag'] = ResolversParentTypes['CompanyRelationshipTag']> = {
  companyRelationshipId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  tagCategory?: Resolver<Maybe<ResolversTypes['TagCategory']>, ParentType, ContextType>;
  tagId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyRelationshipTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyRelationshipType'] = ResolversParentTypes['CompanyRelationshipType']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  colorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  companyRelationshipTypeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanySaaSFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanySaaSFeature'] = ResolversParentTypes['CompanySaaSFeature']> = {
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  featureId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyServiceAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyServiceAccount'] = ResolversParentTypes['CompanyServiceAccount']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyTag'] = ResolversParentTypes['CompanyTag']> = {
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyType'] = ResolversParentTypes['CompanyType']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  colorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  companyTypeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCustomerResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerResult'] = ResolversParentTypes['CreateCustomerResult']> = {
  customerCompanyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateRelatedCompanyResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateRelatedCompanyResult'] = ResolversParentTypes['CreateRelatedCompanyResult']> = {
  relatedCompany?: Resolver<ResolversTypes['RelatedCompany'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateRetailerProductResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateRetailerProductResult'] = ResolversParentTypes['CreateRetailerProductResult']> = {
  retailerProductId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateStorageLocationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateStorageLocationResult'] = ResolversParentTypes['CreateStorageLocationResult']> = {
  storageLocationId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTagCategoryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTagCategoryResult'] = ResolversParentTypes['CreateTagCategoryResult']> = {
  error?: Resolver<Maybe<ResolversTypes['CreateTagCategoryError']>, ParentType, ContextType>;
  tagCategory?: Resolver<Maybe<ResolversTypes['TagCategory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTagResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTagResult'] = ResolversParentTypes['CreateTagResult']> = {
  error?: Resolver<Maybe<ResolversTypes['CreateTagError']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWarehouseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateWarehouseResult'] = ResolversParentTypes['CreateWarehouseResult']> = {
  error?: Resolver<Maybe<ResolversTypes['CreateWarehouseError']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyRelationshipTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanyRelationshipTag']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  customerCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  customerCompanyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteStorageLocationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteStorageLocationResult'] = ResolversParentTypes['DeleteStorageLocationResult']> = {
  error?: Resolver<Maybe<ResolversTypes['DeleteStorageLocationError']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserRoleResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserRoleResult'] = ResolversParentTypes['DeleteUserRoleResult']> = {
  userRole?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteWarehousesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteWarehousesResult'] = ResolversParentTypes['DeleteWarehousesResult']> = {
  error?: Resolver<Maybe<ResolversTypes['DeleteWarehousesError']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnterpriseFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnterpriseField'] = ResolversParentTypes['EnterpriseField']> = {
  enterpriseItem?: Resolver<Maybe<ResolversTypes['EnterpriseItem']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['FieldInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnterpriseItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnterpriseItem'] = ResolversParentTypes['EnterpriseItem']> = {
  billingSplitGroup?: Resolver<Maybe<ResolversTypes['BillingSplitGroup']>, ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  itemType?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldInfo'] = ResolversParentTypes['FieldInfo']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  fieldName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fieldTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldTag']>>>, ParentType, ContextType>;
  fieldVersions?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldVersion']>>>, ParentType, ContextType>;
  geoLocation?: Resolver<Maybe<ResolversTypes['GeoLocation']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  plssLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  plssLocationState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldLayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldLayer'] = ResolversParentTypes['FieldLayer']> = {
  area?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  fieldLayerZones?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldLayerZone']>>>, ParentType, ContextType>;
  fieldVersionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  geoJsonData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  geoLocation?: Resolver<Maybe<ResolversTypes['GeoLocation']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  layerDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  layerFileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  layerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  layerType?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  manuallyGenerated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldLayerZoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldLayerZone'] = ResolversParentTypes['FieldLayerZone']> = {
  area?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  fieldLayerId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  geoJsonData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  geoLocation?: Resolver<Maybe<ResolversTypes['GeoLocation']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneFileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldTag'] = ResolversParentTypes['FieldTag']> = {
  fieldId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldVersionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldVersion'] = ResolversParentTypes['FieldVersion']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  calculatedArea?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  estimatedArea?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fieldId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fieldLayers?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldLayer']>>>, ParentType, ContextType>;
  fieldVersionTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FieldVersionTag']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldVersionTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldVersionTag'] = ResolversParentTypes['FieldVersionTag']> = {
  fieldVersionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoLocation'] = ResolversParentTypes['GeoLocation']> = {
  accuracy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  altitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetCompaniesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetCompaniesResult'] = ResolversParentTypes['GetCompaniesResult']> = {
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetCustomerResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetCustomerResult'] = ResolversParentTypes['GetCustomerResult']> = {
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetCustomersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetCustomersResult'] = ResolversParentTypes['GetCustomersResult']> = {
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetManufacturerProductsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetManufacturerProductsResult'] = ResolversParentTypes['GetManufacturerProductsResult']> = {
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetManufacturersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetManufacturersResult'] = ResolversParentTypes['GetManufacturersResult']> = {
  manufacturers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Manufacturer']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetNutrientRemovalsRateResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetNutrientRemovalsRateResult'] = ResolversParentTypes['GetNutrientRemovalsRateResult']> = {
  nutrientRemovalRates?: Resolver<Array<ResolversTypes['NutrientRemovalRate']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPaymentTermsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetPaymentTermsResult'] = ResolversParentTypes['GetPaymentTermsResult']> = {
  paymentTerms?: Resolver<Maybe<Array<Maybe<ResolversTypes['PaymentTerm']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetRelatedCompaniesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetRelatedCompaniesResult'] = ResolversParentTypes['GetRelatedCompaniesResult']> = {
  relatedCompanies?: Resolver<Array<ResolversTypes['RelatedCompany']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetRelatedCompanyResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetRelatedCompanyResult'] = ResolversParentTypes['GetRelatedCompanyResult']> = {
  relatedCompany?: Resolver<ResolversTypes['RelatedCompany'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetRetailerProductResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetRetailerProductResult'] = ResolversParentTypes['GetRetailerProductResult']> = {
  product?: Resolver<Maybe<ResolversTypes['RetailerProduct']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetRetailerProductsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetRetailerProductsResult'] = ResolversParentTypes['GetRetailerProductsResult']> = {
  products?: Resolver<Array<ResolversTypes['RetailerProduct']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetStorageLocationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetStorageLocationResult'] = ResolversParentTypes['GetStorageLocationResult']> = {
  storageLocation?: Resolver<Maybe<ResolversTypes['StorageLocation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetStorageLocationsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetStorageLocationsResult'] = ResolversParentTypes['GetStorageLocationsResult']> = {
  storageLocations?: Resolver<Array<ResolversTypes['StorageLocation']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetTagCategoriesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetTagCategoriesResult'] = ResolversParentTypes['GetTagCategoriesResult']> = {
  tagCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['TagCategory']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetTagCategoryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetTagCategoryResult'] = ResolversParentTypes['GetTagCategoryResult']> = {
  tagCategory?: Resolver<Maybe<ResolversTypes['TagCategory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetTagResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetTagResult'] = ResolversParentTypes['GetTagResult']> = {
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetTagsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetTagsResult'] = ResolversParentTypes['GetTagsResult']> = {
  error?: Resolver<Maybe<ResolversTypes['GetTagsError']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUsersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetUsersResult'] = ResolversParentTypes['GetUsersResult']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetWarehouseInfoResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetWarehouseInfoResult'] = ResolversParentTypes['GetWarehouseInfoResult']> = {
  error?: Resolver<Maybe<ResolversTypes['GetWarehouseInfoError']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetWarehousesForCompanyResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetWarehousesForCompanyResult'] = ResolversParentTypes['GetWarehousesForCompanyResult']> = {
  error?: Resolver<Maybe<ResolversTypes['GetWarehousesForCompanyError']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Warehouse']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrowingSeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrowingSeason'] = ResolversParentTypes['GrowingSeason']> = {
  crop?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  cropId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cropYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  harvestDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  plantingDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  yield?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yieldGoal?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yieldGoalMeasurement?: Resolver<Maybe<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  yieldMeasurement?: Resolver<Maybe<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LinkAccountToEnterpriseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkAccountToEnterpriseResult'] = ResolversParentTypes['LinkAccountToEnterpriseResult']> = {
  linkedRelationship?: Resolver<ResolversTypes['CompanyRelationship'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkCompaniesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkCompaniesResult'] = ResolversParentTypes['LinkCompaniesResult']> = {
  linkedRelationship?: Resolver<ResolversTypes['CompanyRelationship'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManufacturerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Manufacturer'] = ResolversParentTypes['Manufacturer']> = {
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyType?: Resolver<Maybe<ResolversTypes['CompanyType']>, ParentType, ContextType>;
  companyTypeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  productsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addRole?: Resolver<ResolversTypes['Role'], ParentType, ContextType, Partial<MutationAddRoleArgs>>;
  addUserRole?: Resolver<ResolversTypes['AddOrUpdateUserRoleResult'], ParentType, ContextType, Partial<MutationAddUserRoleArgs>>;
  createCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'input'>>;
  createField?: Resolver<Maybe<ResolversTypes['EnterpriseField']>, ParentType, ContextType, Partial<MutationCreateFieldArgs>>;
  createRelatedCompany?: Resolver<ResolversTypes['CreateRelatedCompanyResult'], ParentType, ContextType, RequireFields<MutationCreateRelatedCompanyArgs, 'input'>>;
  createRetailerProduct?: Resolver<ResolversTypes['CreateRetailerProductResult'], ParentType, ContextType, Partial<MutationCreateRetailerProductArgs>>;
  createStorageLocation?: Resolver<ResolversTypes['CreateStorageLocationResult'], ParentType, ContextType, Partial<MutationCreateStorageLocationArgs>>;
  createTag?: Resolver<ResolversTypes['CreateTagResult'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'input'>>;
  createTagCategory?: Resolver<ResolversTypes['CreateTagCategoryResult'], ParentType, ContextType, RequireFields<MutationCreateTagCategoryArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createWarehouse?: Resolver<ResolversTypes['CreateWarehouseResult'], ParentType, ContextType, RequireFields<MutationCreateWarehouseArgs, 'input'>>;
  deleteStorageLocation?: Resolver<ResolversTypes['DeleteStorageLocationResult'], ParentType, ContextType, RequireFields<MutationDeleteStorageLocationArgs, 'input'>>;
  deleteUserRole?: Resolver<ResolversTypes['DeleteUserRoleResult'], ParentType, ContextType, Partial<MutationDeleteUserRoleArgs>>;
  deleteWarehouses?: Resolver<ResolversTypes['DeleteWarehousesResult'], ParentType, ContextType, RequireFields<MutationDeleteWarehousesArgs, 'input'>>;
  inviteUsers?: Resolver<ResolversTypes['SendInvitesResult'], ParentType, ContextType, Partial<MutationInviteUsersArgs>>;
  linkAccountToEnterprise?: Resolver<ResolversTypes['LinkAccountToEnterpriseResult'], ParentType, ContextType, RequireFields<MutationLinkAccountToEnterpriseArgs, 'input'>>;
  linkCompanies?: Resolver<ResolversTypes['LinkCompaniesResult'], ParentType, ContextType, RequireFields<MutationLinkCompaniesArgs, 'input'>>;
  registerUserWithCompany?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationRegisterUserWithCompanyArgs>>;
  removeAccountLinkFromEnterprise?: Resolver<ResolversTypes['RemoveAccountLinkFromEnterpriseResult'], ParentType, ContextType, RequireFields<MutationRemoveAccountLinkFromEnterpriseArgs, 'input'>>;
  unlinkCompanies?: Resolver<ResolversTypes['UnlinkCompaniesResult'], ParentType, ContextType, RequireFields<MutationUnlinkCompaniesArgs, 'input'>>;
  updateRetailerProduct?: Resolver<ResolversTypes['UpdateRetailerProductResult'], ParentType, ContextType, Partial<MutationUpdateRetailerProductArgs>>;
  updateStorageLocation?: Resolver<ResolversTypes['UpdateStorageLocationResult'], ParentType, ContextType, Partial<MutationUpdateStorageLocationArgs>>;
  updateTag?: Resolver<ResolversTypes['UpdateTagResult'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'input'>>;
  updateTagCategory?: Resolver<ResolversTypes['UpdateTagCategoryResult'], ParentType, ContextType, RequireFields<MutationUpdateTagCategoryArgs, 'input'>>;
  updateUserProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUpdateUserProfileArgs>>;
  updateUserRole?: Resolver<ResolversTypes['AddOrUpdateUserRoleResult'], ParentType, ContextType, Partial<MutationUpdateUserRoleArgs>>;
  updateWarehouse?: Resolver<ResolversTypes['UpdateWarehouseResult'], ParentType, ContextType, RequireFields<MutationUpdateWarehouseArgs, 'input'>>;
};

export type NutrientRemovalRateResolvers<ContextType = any, ParentType extends ResolversParentTypes['NutrientRemovalRate'] = ResolversParentTypes['NutrientRemovalRate']> = {
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  crop?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  cropId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isDryMatter?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSilage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nutrient?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  nutrientId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  removalRateUnit?: Resolver<Maybe<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  removalRateUnitId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  removalRateValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  waterPercentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  yearId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentTermResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentTerm'] = ResolversParentTypes['PaymentTerm']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discountDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  discountPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dueDays?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  paymentTerm?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  EPA?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commonName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  externalId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gaPageParam?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasIcon?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  iconUI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isCanada?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCoPack?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isUs?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  labelDAT?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logoId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  manId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['Manufacturer']>, ParentType, ContextType>;
  manufacturerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manufacturerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAccountEnterpriseItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnterpriseField']>>>, ParentType, ContextType, RequireFields<QueryGetAccountEnterpriseItemsArgs, 'input'>>;
  getAllCompanyTypes?: Resolver<Array<ResolversTypes['CompanyType']>, ParentType, ContextType>;
  getAvailableRoles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  getAvailableUnitsOfMeasurement?: Resolver<Array<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  getCompanies?: Resolver<ResolversTypes['GetCompaniesResult'], ParentType, ContextType, Partial<QueryGetCompaniesArgs>>;
  getCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, Partial<QueryGetCompanyArgs>>;
  getCompanyOrCreate?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  getField?: Resolver<Maybe<ResolversTypes['EnterpriseField']>, ParentType, ContextType, Partial<QueryGetFieldArgs>>;
  getFieldsForCompany?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnterpriseField']>>>, ParentType, ContextType, Partial<QueryGetFieldsForCompanyArgs>>;
  getManufacturerProducts?: Resolver<ResolversTypes['GetManufacturerProductsResult'], ParentType, ContextType, RequireFields<QueryGetManufacturerProductsArgs, 'companyId'>>;
  getManufacturers?: Resolver<ResolversTypes['GetManufacturersResult'], ParentType, ContextType, RequireFields<QueryGetManufacturersArgs, 'companyId'>>;
  getNutrientRemovalRate?: Resolver<Maybe<ResolversTypes['NutrientRemovalRate']>, ParentType, ContextType, RequireFields<QueryGetNutrientRemovalRateArgs, 'nutrientRemovalRateId'>>;
  getNutrientRemovalRates?: Resolver<ResolversTypes['GetNutrientRemovalsRateResult'], ParentType, ContextType, RequireFields<QueryGetNutrientRemovalRatesArgs, 'companyId'>>;
  getPaymentTerms?: Resolver<ResolversTypes['GetPaymentTermsResult'], ParentType, ContextType, Partial<QueryGetPaymentTermsArgs>>;
  getRelatedCompanies?: Resolver<ResolversTypes['GetRelatedCompaniesResult'], ParentType, ContextType, RequireFields<QueryGetRelatedCompaniesArgs, 'companyId' | 'relationshipType'>>;
  getRelatedCompany?: Resolver<ResolversTypes['GetRelatedCompanyResult'], ParentType, ContextType, RequireFields<QueryGetRelatedCompanyArgs, 'companyId' | 'companyRelationshipType' | 'relatedCompanyId'>>;
  getRetailerProducts?: Resolver<ResolversTypes['GetRetailerProductsResult'], ParentType, ContextType, RequireFields<QueryGetRetailerProductsArgs, 'companyId'>>;
  getStorageLocationById?: Resolver<Maybe<ResolversTypes['StorageLocation']>, ParentType, ContextType, Partial<QueryGetStorageLocationByIdArgs>>;
  getStorageLocations?: Resolver<ResolversTypes['GetStorageLocationsResult'], ParentType, ContextType, Partial<QueryGetStorageLocationsArgs>>;
  getSubsidiaryCompanies?: Resolver<ResolversTypes['GetCompaniesResult'], ParentType, ContextType, RequireFields<QueryGetSubsidiaryCompaniesArgs, 'parentCompanyId'>>;
  getSubsidiaryCompaniesTree?: Resolver<ResolversTypes['GetCompaniesResult'], ParentType, ContextType, Partial<QueryGetSubsidiaryCompaniesTreeArgs>>;
  getTag?: Resolver<ResolversTypes['GetTagResult'], ParentType, ContextType, Partial<QueryGetTagArgs>>;
  getTagCategories?: Resolver<ResolversTypes['GetTagCategoriesResult'], ParentType, ContextType, Partial<QueryGetTagCategoriesArgs>>;
  getTagCategory?: Resolver<ResolversTypes['GetTagCategoryResult'], ParentType, ContextType, Partial<QueryGetTagCategoryArgs>>;
  getTags?: Resolver<ResolversTypes['GetTagsResult'], ParentType, ContextType, Partial<QueryGetTagsArgs>>;
  getUserByExternalId?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByExternalIdArgs, 'externalId'>>;
  getUserByUserId?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByUserIdArgs, 'userId'>>;
  getUserOrCreate?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUsers?: Resolver<ResolversTypes['GetUsersResult'], ParentType, ContextType, Partial<QueryGetUsersArgs>>;
  getUsersWithRolesInCompany?: Resolver<ResolversTypes['GetUsersResult'], ParentType, ContextType, RequireFields<QueryGetUsersWithRolesInCompanyArgs, 'companyId'>>;
  getWarehouseInfo?: Resolver<ResolversTypes['GetWarehouseInfoResult'], ParentType, ContextType, RequireFields<QueryGetWarehouseInfoArgs, 'input'>>;
  getWarehousesForCompany?: Resolver<ResolversTypes['GetWarehousesForCompanyResult'], ParentType, ContextType, RequireFields<QueryGetWarehousesForCompanyArgs, 'input'>>;
};

export type RelatedCompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['RelatedCompany'] = ResolversParentTypes['RelatedCompany']> = {
  companyRelationship?: Resolver<Maybe<ResolversTypes['CompanyRelationship']>, ParentType, ContextType>;
  companyRelationshipDirection?: Resolver<Maybe<ResolversTypes['CompanyRelationshipDirection']>, ParentType, ContextType>;
  companyRelationshipId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyRelationshipType?: Resolver<ResolversTypes['CompanyRelationshipType'], ParentType, ContextType>;
  companyRelationshipTypeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  firstCompanyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secondCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  secondCompanyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveAccountLinkFromEnterpriseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveAccountLinkFromEnterpriseResult'] = ResolversParentTypes['RemoveAccountLinkFromEnterpriseResult']> = {
  removedRelationship?: Resolver<ResolversTypes['CompanyRelationship'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RetailerProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['RetailerProduct'] = ResolversParentTypes['RetailerProduct']> = {
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productBrochureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productSku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  retailerProductComponents?: Resolver<Maybe<Array<Maybe<ResolversTypes['RetailerProductComponent']>>>, ParentType, ContextType>;
  retailerProductTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['RetailerProductTag']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RetailerProductComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['RetailerProductComponent'] = ResolversParentTypes['RetailerProductComponent']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  measurementValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retailerProductId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unitOfMeasurement?: Resolver<Maybe<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  unitOfMeasurementId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RetailerProductTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['RetailerProductTag'] = ResolversParentTypes['RetailerProductTag']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  retailerProductId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['RolePermission']>, ParentType, ContextType>;
  roleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolePermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolePermission'] = ResolversParentTypes['RolePermission']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissionName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendInvitesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendInvitesResult'] = ResolversParentTypes['SendInvitesResult']> = {
  failedEmails?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['StorageLocation'] = ResolversParentTypes['StorageLocation']> = {
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['StorageLocation']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  identifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['StorageLocation']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  storageType?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  storageTypeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  colorIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagCategory?: Resolver<Maybe<ResolversTypes['TagCategory']>, ParentType, ContextType>;
  tagCategoryId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tagName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagCategory'] = ResolversParentTypes['TagCategory']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  colorIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagCategoryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnitOfMeasurementResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnitOfMeasurement'] = ResolversParentTypes['UnitOfMeasurement']> = {
  baseUnit?: Resolver<Maybe<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  baseUnitId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  colorIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  conversionFactor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  denominatorMultiplier?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  denominatorUnit?: Resolver<Maybe<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  denominatorUnitId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  denominatorUnitType?: Resolver<Maybe<ResolversTypes['UnitOfMeasurementType']>, ParentType, ContextType>;
  derivedUnits?: Resolver<Maybe<Array<Maybe<ResolversTypes['UnitOfMeasurement']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastUpdatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numeratorMultiplier?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  numeratorUnit?: Resolver<Maybe<ResolversTypes['UnitOfMeasurement']>, ParentType, ContextType>;
  numeratorUnitId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numeratorUnitType?: Resolver<Maybe<ResolversTypes['UnitOfMeasurementType']>, ParentType, ContextType>;
  pluralName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  singularName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unitName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitOfMeasurementType?: Resolver<Maybe<ResolversTypes['UnitOfMeasurementType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlinkCompaniesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlinkCompaniesResult'] = ResolversParentTypes['UnlinkCompaniesResult']> = {
  unlinkedRelationship?: Resolver<ResolversTypes['CompanyRelationship'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateRetailerProductResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateRetailerProductResult'] = ResolversParentTypes['UpdateRetailerProductResult']> = {
  retailerProductId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateStorageLocationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateStorageLocationResult'] = ResolversParentTypes['UpdateStorageLocationResult']> = {
  error?: Resolver<Maybe<ResolversTypes['UpdateStorageLocationError']>, ParentType, ContextType>;
  storageLocationId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateTagCategoryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateTagCategoryResult'] = ResolversParentTypes['UpdateTagCategoryResult']> = {
  error?: Resolver<Maybe<ResolversTypes['UpdateTagCategoryError']>, ParentType, ContextType>;
  tagCategory?: Resolver<Maybe<ResolversTypes['TagCategory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateTagResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateTagResult'] = ResolversParentTypes['UpdateTagResult']> = {
  error?: Resolver<Maybe<ResolversTypes['UpdateTagError']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateWarehouseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateWarehouseResult'] = ResolversParentTypes['UpdateWarehouseResult']> = {
  error?: Resolver<Maybe<ResolversTypes['UpdateWarehouseError']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAddress']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserPhoneNumber']>>>, ParentType, ContextType>;
  roleCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAddress'] = ResolversParentTypes['UserAddress']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  addressId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  addressType?: Resolver<ResolversTypes['AddressType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPhoneNumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPhoneNumber'] = ResolversParentTypes['UserPhoneNumber']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumberType?: Resolver<ResolversTypes['PhoneNumberType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  extendedProperties?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  additionalSettings?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  avatarFallbackImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  darkMode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  selectedUserRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  selectedUserRoleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Warehouse'] = ResolversParentTypes['Warehouse']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouseName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccountEnterpriseItems?: AccountEnterpriseItemsResolvers<ContextType>;
  AddOrUpdateUserRoleResult?: AddOrUpdateUserRoleResultResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  BillingAccountSplitAllocation?: BillingAccountSplitAllocationResolvers<ContextType>;
  BillingSplitGroup?: BillingSplitGroupResolvers<ContextType>;
  BillingSplitGroupAccount?: BillingSplitGroupAccountResolvers<ContextType>;
  BillingSplitItem?: BillingSplitItemResolvers<ContextType>;
  Companies?: CompaniesResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CompanyAddress?: CompanyAddressResolvers<ContextType>;
  CompanyBasicInfo?: CompanyBasicInfoResolvers<ContextType>;
  CompanyPhoneNumber?: CompanyPhoneNumberResolvers<ContextType>;
  CompanyRelationship?: CompanyRelationshipResolvers<ContextType>;
  CompanyRelationshipTag?: CompanyRelationshipTagResolvers<ContextType>;
  CompanyRelationshipType?: CompanyRelationshipTypeResolvers<ContextType>;
  CompanySaaSFeature?: CompanySaaSFeatureResolvers<ContextType>;
  CompanyServiceAccount?: CompanyServiceAccountResolvers<ContextType>;
  CompanyTag?: CompanyTagResolvers<ContextType>;
  CompanyType?: CompanyTypeResolvers<ContextType>;
  CreateCustomerResult?: CreateCustomerResultResolvers<ContextType>;
  CreateRelatedCompanyResult?: CreateRelatedCompanyResultResolvers<ContextType>;
  CreateRetailerProductResult?: CreateRetailerProductResultResolvers<ContextType>;
  CreateStorageLocationResult?: CreateStorageLocationResultResolvers<ContextType>;
  CreateTagCategoryResult?: CreateTagCategoryResultResolvers<ContextType>;
  CreateTagResult?: CreateTagResultResolvers<ContextType>;
  CreateWarehouseResult?: CreateWarehouseResultResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteStorageLocationResult?: DeleteStorageLocationResultResolvers<ContextType>;
  DeleteUserRoleResult?: DeleteUserRoleResultResolvers<ContextType>;
  DeleteWarehousesResult?: DeleteWarehousesResultResolvers<ContextType>;
  EnterpriseField?: EnterpriseFieldResolvers<ContextType>;
  EnterpriseItem?: EnterpriseItemResolvers<ContextType>;
  FieldInfo?: FieldInfoResolvers<ContextType>;
  FieldLayer?: FieldLayerResolvers<ContextType>;
  FieldLayerZone?: FieldLayerZoneResolvers<ContextType>;
  FieldTag?: FieldTagResolvers<ContextType>;
  FieldVersion?: FieldVersionResolvers<ContextType>;
  FieldVersionTag?: FieldVersionTagResolvers<ContextType>;
  GeoLocation?: GeoLocationResolvers<ContextType>;
  GetCompaniesResult?: GetCompaniesResultResolvers<ContextType>;
  GetCustomerResult?: GetCustomerResultResolvers<ContextType>;
  GetCustomersResult?: GetCustomersResultResolvers<ContextType>;
  GetManufacturerProductsResult?: GetManufacturerProductsResultResolvers<ContextType>;
  GetManufacturersResult?: GetManufacturersResultResolvers<ContextType>;
  GetNutrientRemovalsRateResult?: GetNutrientRemovalsRateResultResolvers<ContextType>;
  GetPaymentTermsResult?: GetPaymentTermsResultResolvers<ContextType>;
  GetRelatedCompaniesResult?: GetRelatedCompaniesResultResolvers<ContextType>;
  GetRelatedCompanyResult?: GetRelatedCompanyResultResolvers<ContextType>;
  GetRetailerProductResult?: GetRetailerProductResultResolvers<ContextType>;
  GetRetailerProductsResult?: GetRetailerProductsResultResolvers<ContextType>;
  GetStorageLocationResult?: GetStorageLocationResultResolvers<ContextType>;
  GetStorageLocationsResult?: GetStorageLocationsResultResolvers<ContextType>;
  GetTagCategoriesResult?: GetTagCategoriesResultResolvers<ContextType>;
  GetTagCategoryResult?: GetTagCategoryResultResolvers<ContextType>;
  GetTagResult?: GetTagResultResolvers<ContextType>;
  GetTagsResult?: GetTagsResultResolvers<ContextType>;
  GetUsersResult?: GetUsersResultResolvers<ContextType>;
  GetWarehouseInfoResult?: GetWarehouseInfoResultResolvers<ContextType>;
  GetWarehousesForCompanyResult?: GetWarehousesForCompanyResultResolvers<ContextType>;
  GrowingSeason?: GrowingSeasonResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LinkAccountToEnterpriseResult?: LinkAccountToEnterpriseResultResolvers<ContextType>;
  LinkCompaniesResult?: LinkCompaniesResultResolvers<ContextType>;
  Manufacturer?: ManufacturerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NutrientRemovalRate?: NutrientRemovalRateResolvers<ContextType>;
  PaymentTerm?: PaymentTermResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RelatedCompany?: RelatedCompanyResolvers<ContextType>;
  RemoveAccountLinkFromEnterpriseResult?: RemoveAccountLinkFromEnterpriseResultResolvers<ContextType>;
  RetailerProduct?: RetailerProductResolvers<ContextType>;
  RetailerProductComponent?: RetailerProductComponentResolvers<ContextType>;
  RetailerProductTag?: RetailerProductTagResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RolePermission?: RolePermissionResolvers<ContextType>;
  SendInvitesResult?: SendInvitesResultResolvers<ContextType>;
  StorageLocation?: StorageLocationResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagCategory?: TagCategoryResolvers<ContextType>;
  UnitOfMeasurement?: UnitOfMeasurementResolvers<ContextType>;
  UnlinkCompaniesResult?: UnlinkCompaniesResultResolvers<ContextType>;
  UpdateRetailerProductResult?: UpdateRetailerProductResultResolvers<ContextType>;
  UpdateStorageLocationResult?: UpdateStorageLocationResultResolvers<ContextType>;
  UpdateTagCategoryResult?: UpdateTagCategoryResultResolvers<ContextType>;
  UpdateTagResult?: UpdateTagResultResolvers<ContextType>;
  UpdateWarehouseResult?: UpdateWarehouseResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAddress?: UserAddressResolvers<ContextType>;
  UserPhoneNumber?: UserPhoneNumberResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
};

