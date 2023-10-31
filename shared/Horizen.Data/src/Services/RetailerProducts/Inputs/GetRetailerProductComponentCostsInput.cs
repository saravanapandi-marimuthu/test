using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class GetRetailerProductComponentCostsInput
{
    public int RetailerProductComponentId { get; set; }
    public DateTime? CostDate { get; set; }
    public int? PackageId { get; set; }
}
