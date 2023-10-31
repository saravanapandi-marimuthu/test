using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.Warehouses.Entities;

public class StorageLocation : BaseEntity
{
    public int Id { get; set; }
    public int WarehouseId { get; set; }
    public int StorageLocationTypeId { get; set; }
    public int? ParentStorageLocationId { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public string? Barcode { get; set; }

    public Warehouse Warehouse { get; set; } = null!;
    public Tag StorageLocationType { get; set; } = null!;
    public StorageLocation? ParentStorageLocation { get; set; }
    public ICollection<StorageLocation> ChildStorageLocations { get; set; } = null!;
}
