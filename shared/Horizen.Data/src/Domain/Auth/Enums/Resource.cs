namespace Horizen.Data.Domain.Auth.Enums;

public enum Resource
{
    None = 0,
    UserProfile = 1 << 0,
    User = 1 << 1,
    Company = 1 << 2,
    Configuration = 1 << 3,
    Order = 1 << 4,
    Product = 1 << 5,
    Customer = 1 << 6,
    Warehouse = 1 << 7,
    Manufacturer = 1 << 8,
    Field = 1 << 9,
    All = ~None,
}
