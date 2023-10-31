using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Horizen.Core.Attributes;
using Horizen.Data.Domain.Common.Entities;
using NetTopologySuite.Geometries;

namespace Horizen.Data.Domain.Fields.Entities;

public class FieldLayerZone : BaseEntity
{
    public int Id { get; set; }
    public int FieldLayerId { get; set; }
    public string ZoneName { get; set; } = "";
    public string? ZoneDescription { get; set; }
    public string? ZoneColor { get; set; }
    public float? ZoneOpacity { get; set; }
    public string? ZoneFileName { get; set; }

    [SkipInGraphQL]
    public Geometry? LayerZoneGeometry { get; set; }
    public int GeoLocationId { get; set; }
    public float Area { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public FieldLayer FieldLayer { get; set; } = null!;
    public GeoLocation? GeoLocation { get; set; } = null!;

    [NotMapped]
    public JsonDocument? GeoJsonData { get; set; } = null!;
}
