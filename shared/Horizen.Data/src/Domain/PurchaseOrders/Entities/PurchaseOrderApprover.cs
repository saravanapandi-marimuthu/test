using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Domain.PurchaseOrders.Enums;

namespace Horizen.Data.Domain.PurchaseOrders.Entities;

public class PurchaseOrderApprover : BaseEntity
{
    public int Id { get; set; }
    public int PurchaseOrderId { get; set; }
    public string UserRoleId { get; set; } = "";
    public PurchaseOrderApprovalStatus ApprovalStatus { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public PurchaseOrder PurchaseOrder { get; set; } = null!;

    public void Dispose() => ExtendedProperties?.Dispose();
}
