using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.Inventory.Enums;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Domain.RetailOrders.Entities;

namespace Horizen.Data.Domain.Inventory.Entities;

public class InventoryTransactionLedgerEntry : BaseEntity
{
    public int Id { get; set; }
    public InventoryTransactionType LedgerEntryType { get; set; } =
        InventoryTransactionType.AddedToInventory;
    public InventoryTransactionSubType TransactionSubType { get; set; } =
        InventoryTransactionSubType.PurchaseOrderReceived;
    public int InventoryItemId { get; set; }
    public int? PurchaseOrderId { get; set; }
    public int? PurchaseOrderLineItemId { get; set; }
    public int? RetailOrderId { get; set; }
    public int? RetailOrderLineItemId { get; set; }
    public string? Notes { get; set; }
    public int PackageId { get; set; }
    public float QuantityChangeByPackage { get; set; }
    public float? Cost { get; set; }
    public Package Package { get; set; } = null!;
    public InventoryItem InventoryItem { get; set; } = null!;
    public PurchaseOrder? PurchaseOrder { get; set; }
    public PurchaseOrderLineItem? PurchaseOrderLineItem { get; set; }
    public RetailOrder? RetailOrder { get; set; }
    public RetailOrderLineItem? RetailOrderLineItem { get; set; }
    public ICollection<InventoryItemLotInfo> InventoryItemLots { get; set; } =
        new List<InventoryItemLotInfo>();
}
