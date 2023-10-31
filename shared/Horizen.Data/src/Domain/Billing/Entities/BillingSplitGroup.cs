using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.EnterpriseItems.Entities;

namespace Horizen.Data.Domain.Billing.Entities;

public class BillingSplitGroup : BaseEntity
{
    public int Id { get; set; }
    public string SplitGroupName { get; set; } = "";
    public int? DefaultSplitItemId { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public BillingSplitItem? DefaultSplitItem { get; set; }
    public ICollection<EnterpriseItem> EnterpriseItems { get; set; } = new List<EnterpriseItem>();
    public ICollection<BillingSplitGroupAccount> BillingSplitGroupAccounts { get; set; } =
        new List<BillingSplitGroupAccount>();
    public ICollection<BillingSplitItem> SplitItems { get; set; } = new List<BillingSplitItem>();

    public void Dispose() => ExtendedProperties?.Dispose();
}
