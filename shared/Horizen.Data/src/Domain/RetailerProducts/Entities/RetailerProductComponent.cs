using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Entities;

namespace Horizen.Data.Domain.RetailerProducts.Entities;

public class RetailerProductComponent : BaseEntity
{
    public int Id { get; set; }
    public int RetailerProductId { get; set; }
    public int ManufacturerProductId { get; set; }
    public int? UnitOfMeasurementId { get; set; }
    public decimal? MeasurementValue { get; set; }
    public decimal CompositionPercentage { get; set; } = 100;

    public UnitOfMeasurement? UnitOfMeasurement { get; set; } = null!;
    public RetailerProduct RetailerProduct { get; set; } = null!;
    public ManufacturerProduct ManufacturerProduct { get; set; } = null!;
    public ICollection<RetailerProductComponentCost> RetailerProductComponentCosts { get; set; } =
        new List<RetailerProductComponentCost>();
}
