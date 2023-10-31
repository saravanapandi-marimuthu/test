using Horizen.Data.Domain.ManufacturerProducts.Enums;

namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class CreateRetailerProductInput
{
    public Guid RetailerCompanyId { get; set; }
    public string ProductName { get; set; } = "";
    public ProductCategory? ProductCategory { get; set; }
    public ProductType? ProductType { get; set; }
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public string? ImageUrl { get; set; }
    public string? BrochureUrl { get; set; }
    public string? Url { get; set; }
    public string? Sku { get; set; }

    //public ICollection<TagLinkInput> TagLinks { get; set; } = new List<TagLinkInput>();

    public ICollection<CreateRetailerProductComponentInput> Components { get; set; } =
        new List<CreateRetailerProductComponentInput>();
}

public class CreateRetailerProductComponentInput
{
    public int ManufacturerProductId { get; set; }
    public int? UnitOfMeasurementId { get; set; }
    public decimal? MeasurementValue { get; set; }
}
