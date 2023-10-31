import {
  Field,
  Tag,
  TagCategory,
  FieldTag,
  FieldVersion,
  GrowingSeason,
  GeoLocation,
  Prisma,
  EnterpriseItem,
  BillingSplitGroup,
  BillingSplitItem,
  BillingAccountSplitAllocation,
  BillingSplitGroupAccount,
  Company,
  FieldLayer,
  FieldLayerZone,
  FieldVersionTag,
} from '../../../../../prisma/client'
import { CompanyWithRelations } from '../../companies/types/companyTypeExtensions'
import exp from 'constants'
import { TagWithRelations } from '../../configurations/types/configurationTypeExtensions'
import { TagInput } from '../../../graphql/generated/graphql'
import { TagLinkInput } from '../../types/types'

export type FieldTagWithRelations = FieldTag & {
  tag: TagWithRelations
}

export interface GrowingSeasonWithRelations extends GrowingSeason {
  crop: Tag
}

/*
export interface SubfieldTagWithRelations extends SubfieldTag {
  tagCategory?: TagCategory
  tag: Tag
}

export interface SubfieldBoundaryWithRelations extends SubfieldBoundary {
  geoLocation: GeoLocation
}

export interface SubfieldWithRelations extends Subfield {
  subfieldTags?: SubfieldTagWithRelations[]
  growingSeasons?: GrowingSeasonWithRelations[]
  boundaries?: SubfieldBoundaryWithRelations[]
}
*/

export type EnterpriseItemWithRelations = EnterpriseItem & {
  itemType: Tag
  billingSplitGroup: BillingSplitGroupWithRelations
}

export type BillingSplitGroupWithRelations = BillingSplitGroup & {
  splitItems: BillingSplitItem[]
  splitGroupAccounts: BillingSplitGroupAccountWithRelation[]
}

export type BillingSplitItemWithRelations = BillingSplitItem & {
  accountSplitAllocations: BillingAccountSplitAllocation[]
  childSplitItems: BillingSplitItem[]
}

export type BillingSplitGroupAccountWithRelation = BillingSplitGroupAccount & {
  accountCompany: Company
}

export type FieldWithRelations = Field & {
  fieldTags?: FieldTagWithRelations[]
  fieldVersions?: FieldVersionWithRelations[]
  geoLocation?: GeoLocation
}

export type FieldVersionWithRelations = FieldVersion & {
  fieldVersionTags?: FieldVersionTagWithRelations[]
  fieldLayers: FieldLayerWithRelations[]
}

export type FieldVersionTagWithRelations = FieldVersionTag & {
  tag: TagWithRelations
}

export type FieldLayerWithRelations = FieldLayer & {
  fieldLayerZones: FieldLayerZoneWithRelations[]
}

export type FieldLayerZoneWithRelations = FieldLayerZone & {
  geoLocation?: GeoLocation
}

export type EnterpriseField = {
  enterpriseItem: EnterpriseItemWithRelations
  field: FieldWithRelations
}
// Inputs

export type BillingSplitInput = {
  accountCompanyId: string
  splitPercentage: number
  splitTier: TagLinkInput
  retailerProductId?: number
}

export type CreateFieldInput = {
  fieldName: string
  enterpriseCompanyId: string
  notes?: string
  plssLocation: string
  plssLocationState: string
  gpsCoordinates: GeoLocation
  fieldTags: TagLinkInput[]
  estimatedArea: number
  fieldBoundaryData?: Prisma.JsonValue
  billingSplitGroupName?: string
  billingSplits?: BillingSplitInput[]
}
