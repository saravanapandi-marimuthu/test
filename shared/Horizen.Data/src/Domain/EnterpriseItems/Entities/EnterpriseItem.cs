using System.Text.Json;
using Horizen.Data.Domain.Billing.Entities;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.EnterpriseItems.Entities;

public class EnterpriseItem : BaseEntity
{
    public int Id { get; set; }
    public Guid CompanyId { get; set; } = Guid.Empty;
    public int ItemTypeId { get; set; }
    public int ItemId { get; set; }
    public int? BillingSplitGroupId { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public Company Company { get; set; } = null!;
    public Tag ItemType { get; set; } = null!;

    public BillingSplitGroup? BillingSplitGroup { get; set; }

    public void Dispose() => ExtendedProperties?.Dispose();
}
