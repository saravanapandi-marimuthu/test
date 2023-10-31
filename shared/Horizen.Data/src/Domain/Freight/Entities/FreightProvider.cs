using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Freight.Entities;

public class FreightProvider : BaseEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public ICollection<FreightRate> FreightRates { get; set; } = new List<FreightRate>();

    public void Dispose() => ExtendedProperties?.Dispose();
}
