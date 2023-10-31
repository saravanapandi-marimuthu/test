using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Entities;

namespace Horizen.Data.Domain.PurchaseOrders.Entities;

public class PurchaseOrderDiscount : BaseEntity
{
    public int Id { get; set; }
    public int PurchaseOrderId { get; set; }
    public int? LineItemId { get; set; }
    public float Value { get; set; }
    public bool IsPercentage { get; set; }
    public float AppliedAmount { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public PurchaseOrder PurchaseOrder { get; set; } = null!;
    public PurchaseOrderLineItem? LineItem { get; set; }

    public void Dispose() => ExtendedProperties?.Dispose();
}
