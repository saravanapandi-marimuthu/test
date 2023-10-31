using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Horizen.Core.Attributes;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Fields.Enums;
using NetTopologySuite.Geometries;

namespace Horizen.Data.Domain.Fields.Entities;

public class FieldLayer : BaseEntity
{
    public int Id { get; set; }
    public int FieldVersionId { get; set; }
    public bool ManuallyGenerated { get; set; }
    public FieldLayerType LayerType { get; set; }
    public string LayerName { get; set; } = "";
    public string? LayerDescription { get; set; }
    public string? LayerFileName { get; set; }
    public int? GeoLocationId { get; set; }
    public float Area { get; set; }
    public string? Notes { get; set; }

    [SkipInGraphQL]
    public Geometry? LayerGeometry { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public FieldVersion FieldVersion { get; set; } = null!;
    public ICollection<FieldLayerZone> FieldLayerZones { get; set; } = null!;

    [NotMapped]
    public JsonDocument? GeoJsonData { get; set; }
}
