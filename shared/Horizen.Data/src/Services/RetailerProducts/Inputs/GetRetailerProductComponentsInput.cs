using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class GetRetailerProductComponentsInput : PaginationInput
{
    public Guid RetailerCompanyId { get; set; }
    public DateTime? CostDate { get; set; }
}
