using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.Warehouses.Inputs;

public class GetStorageLocationsInput : PaginationInput
{
    public int WarehouseId { get; set; }
}
