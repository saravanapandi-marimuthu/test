using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Billing.Entities;

public class BillingAccountSplitAllocation : BaseEntity
{
    public int SplitGroupAccountId { get; set; }
    public int SplitItemId { get; set; }
    public float SplitValue { get; set; }
    public BillingSplitValueType SplitValueType { get; set; }
    public BillingSplitItem SplitItem { get; set; } = null!;
}

public enum BillingSplitValueType
{
    Percentage,
    FixedAmount,
    Ratio
}
