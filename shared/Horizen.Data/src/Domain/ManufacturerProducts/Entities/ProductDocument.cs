using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.ManufacturerProducts.Entities;

public class ProductDocument : BaseEntity
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string SiteUrl { get; set; } = "";
    public string? LabelFolder { get; set; }
    public string? FileName { get; set; }
    public string? Description { get; set; }
    public string? DocType { get; set; }
    public int DocId { get; set; }

    public ManufacturerProduct Product { get; set; } = null!;
}
