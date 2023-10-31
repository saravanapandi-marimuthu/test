using Horizen.Core.Attributes;

namespace Horizen.Data.Domain.CompanyRelationships.Enums;

public enum CompanyRelationshipType
{
    [EnumMetadata("Partner", "Partner Company")]
    Partner = 10,

    [EnumMetadata("Supplier", "Supplier Company")]
    Supplier = 20,

    [EnumMetadata("Vendor", "Vendor Company")]
    Vendor = 30,

    [EnumMetadata("Customer", "Customer Company")]
    Customer = 40,

    [EnumMetadata("Enterprise Owner", "Enterprise Owner Company")]
    EnterpriseOwner = 50,

    [EnumMetadata("Enterprise Service Provider", "Ag Retailer Company Servicing Enterprise")]
    EnterpriseServiceProvider = 60,
}
