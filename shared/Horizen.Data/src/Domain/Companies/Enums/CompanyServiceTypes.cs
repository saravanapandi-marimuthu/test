using Horizen.Core.Attributes;

namespace Horizen.Data.Domain.Companies.Enums;

[Flags]
public enum CompanyServiceTypes
{
    Unknown = 0,

    [EnumMetadata("Manufacturer", "Manufacturer")]
    Manufacturer = 1 << 1,

    [EnumMetadata("Distributor", "Distributor")]
    Distributor = 1 << 2,

    [EnumMetadata("Enterprise", "Enterprise")]
    Enterprise = 1 << 3,

    [EnumMetadata("Ag Retailer", "Ag Retailer")]
    AgRetailer = 1 << 4,

    [EnumMetadata("Service Provider", "Service Provider")]
    ServiceProvider = 1 << 5,

    [EnumMetadata("Account", "Account")]
    Account = 1 << 6,

    [EnumMetadata("System", "System")]
    System = 1 << 31,
}
