namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class UpdateRetailerProductComponentCostInput
{
    public int RetailerProductComponentCostId { get; set; }
    public decimal PackageCost { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCostOverridden { get; set; }
}
