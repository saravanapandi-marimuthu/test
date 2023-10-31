using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;

namespace Horizen.Data.Domain.Warehouses.Entities;

public class Warehouse : BaseEntity
{
    public int Id { get; set; }
    public Guid RetailerCompanyId { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public Company RetailerCompany { get; set; } = null!;
    public ICollection<WarehouseAddress> WarehouseAddresses { get; set; } =
        new List<WarehouseAddress>();
    public ICollection<WarehousePhoneNumber> WarehousePhoneNumbers { get; set; } =
        new List<WarehousePhoneNumber>();
    public ICollection<StorageLocation> StorageLocations { get; set; } =
        new List<StorageLocation>();
}
