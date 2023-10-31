using Horizen.Data.Domain.ManufacturerProducts.Enums;
using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.RetailerProducts.Inputs;

public class UpdateRetailerProductInput
{
    public int RetailerProductId { get; set; }
    public string ProductName { get; set; } = "";
    public ProductCategory? ProductCategory { get; set; }
    public ProductType? ProductType { get; set; }
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public string? ImageUrl { get; set; }
    public string? BrochureUrl { get; set; }
    public string? Url { get; set; }
    public string? Sku { get; set; }

    public ICollection<UpdateRetailerProductComponentInput> UpdatedComponents { get; set; } =
        new List<UpdateRetailerProductComponentInput>();

    public ICollection<CreateRetailerProductComponentInput> NewComponents { get; set; } =
        new List<CreateRetailerProductComponentInput>();

    public ICollection<int> RemovedComponents { get; set; } = new List<int>();

    //public ICollection<TagLinkInput> AddedTagLinks { get; set; } = new List<TagLinkInput>();

    //public ICollection<int> RemovedTagIds { get; set; } = new List<int>();
}

public class UpdateRetailerProductComponentInput
{
    public int RetailerProductComponentId { get; set; }
    public int ManufacturerProductId { get; set; }
    public int? UnitOfMeasurementId { get; set; }
    public decimal? MeasurementValue { get; set; }
}
