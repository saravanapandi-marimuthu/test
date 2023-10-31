using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.ManufacturerProducts.Entities;

public class ProductAvailability : BaseEntity
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string? Country { get; set; } = "";
    public string? Region { get; set; }
    public string? Value { get; set; }

    public ManufacturerProduct Product { get; set; } = null!;
}
