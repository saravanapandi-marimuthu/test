using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.PurchaseOrders.Entities;

public class PurchaseOrderFee : BaseEntity
{
    public int Id { get; set; }
    public int PurchaseOrderId { get; set; }
    public int FeeTypeId { get; set; }
    public float Value { get; set; }
    public bool IsPercentage { get; set; }
    public float AppliedAmount { get; set; }
    public bool ApplyAfterDiscount { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public PurchaseOrder PurchaseOrder { get; set; } = null!;
    public Tag FeeType { get; set; } = null!;

    public void Dispose() => ExtendedProperties?.Dispose();
}
