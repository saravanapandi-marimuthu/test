using Horizen.Core.Extensions;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations.Inputs;

public class CreatePackageInput
{
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? BasePackageName { get; set; }
    public string UnitName { get; set; } = "";
    public int ItemsPerPackage { get; set; }
    public decimal QuantityPerItem { get; set; }
    public int PackagesPerPallet { get; set; }
    public int ColorIndex { get; set; }
    public string? Icon { get; set; }

    public Package ToPackage()
    {
        return new Package
        {
            NormalizedName = Name.ToHorizenNormalizedString(),
            Name = Name,
            Description = Description,
            ItemsPerPackage = ItemsPerPackage,
            QuantityPerItem = QuantityPerItem,
            PackagesPerPallet = PackagesPerPallet,
            ColorIndex = ColorIndex,
            Icon = Icon,
        };
    }
}
