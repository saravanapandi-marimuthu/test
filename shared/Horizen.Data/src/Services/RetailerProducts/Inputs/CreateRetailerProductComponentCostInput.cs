namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class CreateRetailerProductComponentCostInput
{
    public int RetailerProductComponentId { get; set; }
    public int PackageId { get; set; }
    public decimal PackageCost { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCostOverridden { get; set; }
}
