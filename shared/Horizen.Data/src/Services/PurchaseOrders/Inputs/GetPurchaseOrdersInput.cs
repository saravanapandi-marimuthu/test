using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.PurchaseOrders.Inputs;

public class GetPurchaseOrdersInput : PaginationInput
{
    public Guid? CompanyId { get; set; }
}
