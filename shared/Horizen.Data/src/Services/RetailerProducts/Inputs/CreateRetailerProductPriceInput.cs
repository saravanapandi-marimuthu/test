namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class CreateRetailerProductPriceInput
{
    public int RetailerProductId { get; set; }
    public int PackageId { get; set; }
    public decimal PackagePrice { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsPriceOverridden { get; set; }
}
