using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.RetailerProducts.Views;

public class RetailerProductComponentCostView
{
    public int RetailerProductComponentId { get; set; }
    public Package? Package { get; set; } = null!;
    public decimal? PackageCost { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool? IsCostOverridden { get; set; }

    public bool IsActive => DateTime.Now >= StartDate && DateTime.Now <= EndDate;

    public decimal UnitCost =>
        Math.Round(
            (PackageCost ?? 0.0m) / Package?.QuantityPerPackage ?? 1.0m,
            2,
            MidpointRounding.AwayFromZero
        );
}
