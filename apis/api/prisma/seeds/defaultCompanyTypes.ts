export const CompanyTypes = {
  SAAS_PROVIDER: 'System',
  AG_RETAILER: 'AgRetailer',
  ACCOUNT: 'Account',
  /**
   * Manufacturer: A manufacturer is a company that produces products like chemicals & fertilizers.
   */
  MANUFACTURER: 'Manufacturer',
  /**
   * Distributor: A distributor is a company that distributes products like chemicals & fertilizers.
   */
  DISTRIBUTOR: 'Distributor',
  /**
   * Enterprise: An enterprise is a farm.
   */
  ENTERPRISE: 'Enterprise',
  /**
   * ServiceProvider: A service provider is a company that Ag Retailers use to service their needs like
   * Soil Sampling, Mapping, Satellite Imagery etc.
   */
  SERVICE_PROVIDER: 'ServiceProvider',
}

const {
  SAAS_PROVIDER,
  AG_RETAILER,
  ACCOUNT,
  MANUFACTURER,
  DISTRIBUTOR,
  ENTERPRISE,
  SERVICE_PROVIDER,
} = CompanyTypes

export const defaultCompanyTypes = [
  SAAS_PROVIDER,
  AG_RETAILER,
  ACCOUNT,
  MANUFACTURER,
  DISTRIBUTOR,
  ENTERPRISE,
  SERVICE_PROVIDER,
]

export default defaultCompanyTypes

/**
 * CompanyRelationshipTypes: The type of relationship between companies.
 */
export enum CompanyRelationshipTypeEnum {
  /**
   * CustomerAccount: A customer account is a company that purchases products or services from a vendor.
   */
  CUSTOMER_ACCOUNT = 'CustomerAccount',
  /**
   * EnterpriseOwner: An enterprise owner is a company that owns a farm.
   */
  ENTERPRISE_OWNER = 'EnterpriseOwner',
  /**
   * EnterpriseServiceRetailer: An Ag Retailer company that provides services to a farm/enterprise.
   */
  ENTERPRISE_SERVICE_RETAILER = 'EnterpriseServiceRetailer',
  /**
   * Vendor: A vendor is a company that sells products or services to the Ag Retailer account.
   */
  VENDOR = 'Vendor',
}
