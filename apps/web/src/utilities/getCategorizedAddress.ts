import { CompanyAddress } from '../graphql/generated/graphql'
import { CategorizedAddress } from '../types/sharedTypes'

const getCategorizedAddressFromCompanyAddress = (
  companyAddress: CompanyAddress,
): CategorizedAddress | undefined => {
  if (!companyAddress) {
    return undefined
  }

  return {
    addressType: companyAddress.addressType,
    address: {
      addressLine1: companyAddress.address.addressLine1,
      addressLine2: companyAddress.address.addressLine2 ?? '',
      city: companyAddress.address.city,
      state: companyAddress.address.state,
      postalCode: companyAddress.address.postalCode,
      country: companyAddress.address.country,
    },
  }
}

export default getCategorizedAddressFromCompanyAddress
