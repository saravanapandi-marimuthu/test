using Horizen.Core.Extensions;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.Configurations.Enums;

namespace Horizen.Data.Services.Configurations.Inputs;

public class CreateUnitOfMeasurementInput
{
    public string? BaseUnitName { get; set; }
    public string UnitName { get; set; } = "";
    public string? SingularName { get; set; }
    public string? PluralName { get; set; }
    public UnitOfMeasurementType UnitOfMeasurementType { get; set; }
    public decimal? ConversionFactor { get; set; }
    public string? NumeratorUnitName { get; set; }
    public UnitOfMeasurementType? NumeratorUnitType { get; set; }
    public decimal NumeratorMultiplier { get; set; }
    public string? DenominatorUnitName { get; set; }
    public UnitOfMeasurementType? DenominatorUnitType { get; set; }
    public decimal DenominatorMultiplier { get; set; }
    public int ColorIndex { get; set; }
    public string? Icon { get; set; }

    internal UnitOfMeasurement ToUnitOfMeasurement()
    {
        return new UnitOfMeasurement
        {
            NormalizedName = UnitName.ToHorizenNormalizedString(),
            Name = UnitName,
            SingularName = SingularName,
            PluralName = PluralName,
            UnitOfMeasurementType = UnitOfMeasurementType,
            ConversionFactor = ConversionFactor,
            NumeratorUnitType = NumeratorUnitType,
            NumeratorMultiplier = NumeratorMultiplier,
            DenominatorUnitType = DenominatorUnitType,
            DenominatorMultiplier = DenominatorMultiplier,
            ColorIndex = ColorIndex,
            Icon = Icon,
        };
    }
}
