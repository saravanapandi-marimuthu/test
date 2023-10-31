using Horizen.Core.Attributes;
using Horizen.Core.Models;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Enums;

namespace Horizen.Data.Domain.ManufacturerProducts.Entities;

public class ManufacturerProduct : BaseEntity
{
    public int Id { get; set; }
    public Guid ManufacturerCompanyId { get; set; }
    public string? ExternalId { get; set; }

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = "";
    public string ProductName { get; set; } = "";
    public ProductCategory? ProductCategory { get; set; }
    public ProductType? ProductType { get; set; }
    public string? UPC { get; set; }
    public string? ProductSku { get; set; }
    public string? BarCode { get; set; }
    public string? LabelDAT { get; set; }
    public int LogoId { get; set; }
    public int ManId { get; set; }
    public string? EPA { get; set; }
    public string? ManufacturerName { get; set; }
    public string? CommonName { get; set; }
    public bool? HasIcon { get; set; }
    public string? IconUrl { get; set; }
    public string? IconUI { get; set; }
    public string? GaPageParam { get; set; }
    public bool IsUs { get; set; }
    public bool IsCanada { get; set; }
    public bool IsCoPack { get; set; }
    public Company ManufacturerCompany { get; set; } = null!;
    public ICollection<ManufacturerPrice> Prices { get; set; } = new List<ManufacturerPrice>();
    public ICollection<ProductAvailability> ProductAvailabilities { get; set; } =
        new List<ProductAvailability>();
    public ICollection<ProductDocument> ProductDocuments { get; set; } =
        new List<ProductDocument>();

    public EnumInfo<ProductCategory>? ProductCategoryInfo =>
        ProductCategory.HasValue ? new EnumInfo<ProductCategory>(ProductCategory.Value) : null;

    public EnumInfo<ProductType>? ProductTypeInfo =>
        ProductType.HasValue ? new EnumInfo<ProductType>(ProductType.Value) : null;
}
