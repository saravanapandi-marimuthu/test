using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Freight.Entities;

public class FreightRate : BaseEntity
{
    public int Id { get; set; }
    public int FreightProviderId { get; set; }
    public int? ZoneId { get; set; }
    public float? MinWeight { get; set; }
    public float? MaxWeight { get; set; }
    public float? MinVolume { get; set; }
    public float? MaxVolume { get; set; }
    public float Price { get; set; }
    public bool Active { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }

    public FreightProvider FreightProvider { get; set; } = null!;
    public FreightZone? Zone { get; set; }

    public void Dispose() => ExtendedProperties?.Dispose();
}
