namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class UpdateRetailerProductPriceInput
{
    public int RetailerProductPriceId { get; set; }
    public decimal PackagePrice { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsPriceOverridden { get; set; }
}
