using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Inventory.Entities;

public class InventoryItemLotInfo : BaseEntity
{
    public int Id { get; set; }

    public int InventoryTransactionLedgerEntryId { get; set; }
    public string LotNumber { get; set; } = "";
    public DateTime? ExpirationDate { get; set; }

    public InventoryTransactionLedgerEntry LedgerEntry { get; set; } = null!;
    public ICollection<InventoryItemLotInfoBarCodeEntry>? BarCodeEntries { get; set; }
}
