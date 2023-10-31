using Horizen.Core.Attributes;
using Horizen.Data.Domain.RetailerProducts.Enums;

namespace Horizen.Data.Domain.RetailerProducts.Entities;

public class RetailerProductDiscount
{
    public int Id { get; set; }
    public int RetailProductId { get; set; }

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = null!;
    public string Name { get; set; } = null!;
    public DiscountType Type { get; set; }
    public decimal Value { get; set; } // If Percentage, it might be 0.1 for 10%. If FixedAmount, it could be a dollar value.
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
