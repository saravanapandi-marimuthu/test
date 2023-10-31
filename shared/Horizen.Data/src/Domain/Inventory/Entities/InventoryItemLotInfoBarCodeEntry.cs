using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Inventory.Entities;

public class InventoryItemLotInfoBarCodeEntry : BaseEntity
{
    public int Id { get; set; }

    public int InventoryLotInfoId { get; set; }
    public string Barcode { get; set; } = "";
    public DateTime? ExpirationDate { get; set; }
    public InventoryItemLotInfo LotInfo { get; set; } = null!;
}
