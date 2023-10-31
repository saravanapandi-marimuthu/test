using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.RetailerProducts.Views;

public class RetailerProductPriceView
{
    public int RetailerProductId { get; set; }
    public Package? Package { get; set; } = null!;
    public decimal? PackagePrice { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool? IsPriceOverridden { get; set; }

    public bool IsActive => DateTime.Now >= StartDate && DateTime.Now <= EndDate;

    public decimal UnitPrice =>
        Math.Round(
            (PackagePrice ?? 0.0m) / Package?.QuantityPerPackage ?? 1.0m,
            2,
            MidpointRounding.AwayFromZero
        );
}
