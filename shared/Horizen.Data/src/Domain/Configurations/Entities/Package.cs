using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Core.Attributes;
using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Configurations.Entities;

public class Package : BaseEntity
{
    public int Id { get; set; }

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = "";
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public int? BasePackageId { get; set; }
    public int UnitId { get; set; }
    public decimal QuantityPerItem { get; set; }
    public int ItemsPerPackage { get; set; }
    public int PackagesPerPallet { get; set; }
    public int ColorIndex { get; set; }
    public string? Icon { get; set; }

    [NotMapped]
    public decimal QuantityPerPackage => QuantityPerItem * ItemsPerPackage;

    [NotMapped]
    public decimal QuantityPerPallet => QuantityPerItem * ItemsPerPackage * PackagesPerPallet;

    public UnitOfMeasurement Unit { get; set; } = null!;
    public Package? BasePackage { get; set; }
    public ICollection<Package> DependentPackages { get; set; } = new List<Package>();
}
