namespace Horizen.Data.Domain.RetailOrders.Entities;

[Flags]
public enum RetailOrderTypes
{
    None = 0,
    Chemical = 1 << 1,
    Fertilizer = 1 << 2,
    Seed = 1 << 3,
    Equipment = 1 << 4,
    Other = 1 << 10,
}
