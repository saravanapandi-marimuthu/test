using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class GetRetailerProductPricesInput
{
    public int RetailerProductId { get; set; }
    public DateTime? PriceDate { get; set; }
    public int? PackageId { get; set; }
}
