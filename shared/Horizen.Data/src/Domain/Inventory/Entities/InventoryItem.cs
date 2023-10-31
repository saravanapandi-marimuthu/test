using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Horizen.Data.Domain.Warehouses.Entities;

namespace Horizen.Data.Domain.Inventory.Entities;

public class InventoryItem : BaseEntity
{
    public int Id { get; set; }

    public Guid CompanyId { get; set; }
    public int ProductId { get; set; }
    public int WarehouseId { get; set; }
    public int StorageLocationId { get; set; }

    /// <summary>
    /// InStockQuantity is the quantity of the product that is in stock at the warehouse in the base unit of measurement.
    /// </summary>
    public float InStockQuantity { get; set; }
    public int UnitOfMeasurementId { get; set; }
    public ManufacturerProduct Product { get; set; } = null!;
    public Warehouse Warehouse { get; set; } = null!;
    public Company Company { get; set; } = null!;
    public UnitOfMeasurement UnitOfMeasurement { get; set; } = null!;
    public ICollection<InventoryTransactionLedgerEntry> LedgerEntries { get; set; } =
        new List<InventoryTransactionLedgerEntry>();
}
