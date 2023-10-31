using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Warehouses.Entities;

public class WarehouseAddress : AddressWithType
{
    public int WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = null!;
    public Address Address { get; set; } = null!;
}
