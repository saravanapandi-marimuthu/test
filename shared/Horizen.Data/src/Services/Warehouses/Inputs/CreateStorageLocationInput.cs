using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.Warehouses.Inputs;

public class CreateStorageLocationInput
{
    public int WarehouseId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public string? Barcode { get; set; }
    public int? ParentStorageLocationId { get; set; }
    public TagLinkInput StorageLocationTypeTagLink { get; set; } = null!;
}
