using Horizen.Core.Attributes;
using Horizen.Core.Models;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Enums;

namespace Horizen.Data.Domain.RetailerProducts.Entities;

public class RetailerProduct : BaseEntity
{
    public int Id { get; set; }
    public Guid RetailerCompanyId { get; set; }

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = "";
    public string ProductName { get; set; } = "";
    public ProductCategory? ProductCategory { get; set; }
    public ProductType? ProductType { get; set; }
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public string? ImageUrl { get; set; }
    public string? BrochureUrl { get; set; }
    public string? Url { get; set; }
    public string? Sku { get; set; }
    public Company RetailerCompany { get; set; } = null!;
    public ICollection<RetailerProductComponent> Components { get; set; } =
        new List<RetailerProductComponent>();
    public ICollection<RetailerProductPrice> Prices { get; set; } =
        new List<RetailerProductPrice>();

    public EnumInfo<ProductCategory>? ProductCategoryInfo =>
        ProductCategory.HasValue ? new EnumInfo<ProductCategory>(ProductCategory.Value) : null;

    public EnumInfo<ProductType>? ProductTypeInfo =>
        ProductType.HasValue ? new EnumInfo<ProductType>(ProductType.Value) : null;
}
