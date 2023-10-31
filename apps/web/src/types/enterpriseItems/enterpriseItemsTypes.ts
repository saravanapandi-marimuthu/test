import { Field } from './field/fieldTypes'

export interface GetAccountEnterpriseItemsInput {
  companyId: string
  accountId: string
}

export interface AccountEnterpriseItemData {
  field: Field
}

export interface AccountEnterpriseItemsData {
  getAccountEnterpriseItems?: AccountEnterpriseItemData[]
}
