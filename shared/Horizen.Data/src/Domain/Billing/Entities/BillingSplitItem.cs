using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.Billing.Entities;

public class BillingSplitItem : BaseEntity
{
    public int Id { get; set; }
    public int SplitGroupId { get; set; }
    public int? ParentSplitItemId { get; set; }
    public int SplitTierId { get; set; }

    public BillingSplitGroup SplitGroup { get; set; } = null!;
    public BillingSplitItem? ParentSplitItem { get; set; }
    public ICollection<BillingSplitItem> ChildSplitItems { get; set; } =
        new List<BillingSplitItem>();
    public Tag SplitTier { get; set; } = null!;
    public ICollection<BillingSplitGroup> SplitGroups { get; set; } = new List<BillingSplitGroup>();
    public ICollection<BillingAccountSplitAllocation> BillingAccountSplitAllocations { get; set; } =
        new List<BillingAccountSplitAllocation>();
}
