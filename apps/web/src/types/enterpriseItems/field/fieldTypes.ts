import { Tag } from '../../../graphql/generated/graphql'
import { Company } from '../../companyTypes'
import { UnitOfMeasurement } from '../../productTypes'

export enum BoundaryType {
  MANUAL = 'MANUAL',
  MACHINE = 'MACHINE',
}

export interface GeoLocation {
  latitude?: number | null
  longitude?: number | null
  altitude?: number | null
  accuracy?: number | null
  source?: string | null
  notes?: string | null
}

export interface SubfieldBoundry {
  id: number
  type?: BoundaryType | null
  boundaryFolderBaseUrl?: string | null
  area?: number | null
  geoLocation?: GeoLocation | null
}

export interface GrowingSeason {
  id: number
  startDate?: Date | null
  endDate?: Date | null
  plantingDate?: Date | null
  harvestDate?: Date | null
  cropYear?: number | null
  cropId?: number | null
  notes?: string | null
  crop?: Tag | null
  yieldGoal?: number | null
  yieldGoalMeasurement?: UnitOfMeasurement | null
  yield?: number | null
  yieldMeasurement?: UnitOfMeasurement | null
}

export interface FieldVersionTag {
  id: number
  tagId?: number | null
  fieldVersionId?: number | null
  tag?: Tag | null
}

export interface FieldVersion {
  id: number
  fieldId?: number | null
  estimatedArea?: number | null
  calculatedArea?: number | null
  startDate?: Date | null
  endDate?: Date | null
  active?: boolean | null
  notes?: string | null
  fieldVersionTags?: FieldVersionTag[] | null
  fieldLayers?: FieldLayer[] | null
}

export interface FieldLayer {
  geoJsonData?: string | null
}

export interface Field {
  id: number
  fieldName?: string | null
  companyId?: string | null
  company?: Partial<Company> | null
  notes?: string | null
  fieldVersions?: FieldVersion[] | null
  fieldTags?: FieldTag[] | null
}

export interface FieldTag {
  id: number
  tagId?: number | null
  fieldId?: number | null
  tag?: Tag | null
}

export interface GetFieldsForCompanyInput {
  companyId: string
}

export interface GetFieldInput {
  fieldId: number
  providerCompanyId: string
}

export interface GetFieldsForCompanyData {
  getFieldsForCompany?: Field[] | null
}

export interface GetFieldData {
  getField?: Field | null
}

export interface GrowingSeasonInput {
  startDate?: Date | null
  endDate?: Date | null
  plantingDate?: Date | null
  harvestDate?: Date | null
  cropYear?: number | null
  cropId?: number | null
  notes?: string | null
  yieldGoal?: number | null
  yieldGoalMeasurementId?: number | null
  yield?: number | null
  yieldMeasurementId?: number | null
}

export interface GeoLocationInput {
  latitude?: number | null
  longitude?: number | null
  altitude?: number | null
  accuracy?: number | null
  source?: string | null
  notes?: string | null
}

export interface SubfieldBoundryInput {
  type?: BoundaryType | null
  boundaryFolderBaseUrl?: string | null
  area?: number | null
  geoLocation?: GeoLocationInput | null
}

export interface CreateSubfieldInput {
  name: string
  notes?: string | null
  growingSeasons?: GrowingSeasonInput[] | null
  boundaries?: SubfieldBoundryInput[] | null
}

export interface FieldSplitInput {
  account: string
  splitAmount: number
}

export interface CreateFieldInput {
  fieldName: string
  companyId: string
  notes?: string | null
  farm: string
  splitInfo: [FieldSplitInput]
  plssLocation: string
  state: string
  gpsCoordinates: GeoLocationInput
  cropId: number
  cropName: string
  estimatedAcreage: number
}

export interface CreateFieldData {
  createField?: Field | null
}
