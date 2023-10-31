using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.RetailOrders.Entities;

namespace Horizen.Data.Domain.Fields.Entities;

public class Field : BaseEntity
{
    public int Id { get; set; }
    public string NormalizedName { get; set; } = null!;
    public string Name { get; set; } = "";
    public Guid CompanyId { get; set; } = Guid.Empty;
    public bool Active { get; set; }
    public int? GeoLocationId { get; set; }
    public string? PlssLocation { get; set; }
    public string? PlssLocationState { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public Company Company { get; set; } = null!;
    public GeoLocation? GeoLocation { get; set; }
    public ICollection<FieldTag> FieldTags { get; set; } = new List<FieldTag>();
    public ICollection<FieldVersion> FieldVersions { get; set; } = new List<FieldVersion>();
    public ICollection<RetailOrderFieldInfo> RetailOrdersByField { get; set; } =
        new List<RetailOrderFieldInfo>();

    public void Dispose() => ExtendedProperties?.Dispose();
}
