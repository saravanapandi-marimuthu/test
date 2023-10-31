using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Rebates.Entities;

public class ManufacturerRebate : BaseEntity
{
    public int Id { get; set; }
    public int RebateConditionId { get; set; }
    public Guid RetailerCompanyId { get; set; }
    public int ManufacturerProductId { get; set; }
    public string Name { get; set; } = "";
    public RebateType Type { get; set; } // Enum: PostSale or Instant
    public decimal Amount { get; set; } // This can be either a fixed value or a percentage, depending on your needs.
    public RebateCondition Condition { get; set; } = null!; // For more complex conditions
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public enum RebateType
{
    PostSale,
    Instant
}

public class RebateCondition : BaseEntity
{
    public int Id { get; set; }

    // Example: Minimum purchase amount or quantity for rebate applicability
    public decimal? MinPurchaseAmount { get; set; }
    public int? MinPurchaseQuantity { get; set; }
}
