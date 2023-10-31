using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.Warehouses.Inputs;

public class GetWarehousesInput : PaginationInput
{
    public Guid RetailerCompanyId { get; set; }
}
