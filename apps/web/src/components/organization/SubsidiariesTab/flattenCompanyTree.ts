import { Company } from '../../../types/companyTypes'

export const flattenCompanyTree = (company: Company): Company[] => {
  // Base case: if there are no child companies, return an array with just the company
  if (!company.childCompanies || company.childCompanies.length === 0) {
    return [company]
  }

  // Otherwise, map over each child company, recursively flatten it,
  // and concatenate the results to get a flat array of companies
  const flattenedChildren = company.childCompanies.flatMap(flattenCompanyTree)

  // Include the current company in the resulting array
  return [company, ...flattenedChildren]
}
