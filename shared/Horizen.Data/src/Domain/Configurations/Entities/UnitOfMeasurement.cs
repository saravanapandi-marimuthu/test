using Horizen.Core.Attributes;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Enums;

namespace Horizen.Data.Domain.Configurations.Entities;

public class UnitOfMeasurement : BaseEntity
{
    public int Id { get; set; }
    public int? BaseUnitId { get; set; }

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = "";
    public string Name { get; set; } = "";
    public string? SingularName { get; set; }
    public string? PluralName { get; set; }
    public UnitOfMeasurementType UnitOfMeasurementType { get; set; }
    public decimal? ConversionFactor { get; set; } = 1;
    public int? NumeratorUnitId { get; set; }
    public UnitOfMeasurementType? NumeratorUnitType { get; set; }
    public decimal NumeratorMultiplier { get; set; } = 1;
    public int? DenominatorUnitId { get; set; }
    public UnitOfMeasurementType? DenominatorUnitType { get; set; }
    public decimal DenominatorMultiplier { get; set; } = 1;
    public int ColorIndex { get; set; }
    public string? Icon { get; set; }

    public UnitOfMeasurement? BaseUnit { get; set; }

    public UnitOfMeasurement? NumeratorUnit { get; set; }
    public UnitOfMeasurement? DenominatorUnit { get; set; }

    public ICollection<UnitOfMeasurement> DependentUnits { get; set; } =
        new List<UnitOfMeasurement>();

    public ICollection<Package> Packages { get; set; } = new List<Package>();
}
