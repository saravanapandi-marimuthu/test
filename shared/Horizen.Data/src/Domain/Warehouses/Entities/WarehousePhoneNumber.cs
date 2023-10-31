using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Warehouses.Entities;

public class WarehousePhoneNumber : PhoneNumberWithType
{
    public int WarehouseId { get; set; }
    public PhoneNumber PhoneNumber { get; set; } = null!;
    public Warehouse Warehouse { get; set; } = null!;
}
