using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class GetRetailerProductsInput : PaginationInput
{
    public Guid RetailerCompanyId { get; set; }
}
