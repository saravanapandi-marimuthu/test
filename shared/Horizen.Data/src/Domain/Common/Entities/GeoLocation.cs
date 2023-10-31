using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Core.Attributes;
using NetTopologySuite.Geometries;

namespace Horizen.Data.Domain.Common.Entities;

public class GeoLocation : BaseEntity
{
    public int Id { get; set; }

    [SkipInGraphQL]
    public Point Point { get; set; } = null!;

    [NotMapped]
    public double? Latitude
    {
        get => Point.Y;
        set => Point.Y = value ?? 0;
    }

    [NotMapped]
    public double? Longitude
    {
        get => Point.X;
        set => Point.X = value ?? 0;
    }
    public double? Accuracy { get; set; }
    public double? Altitude { get; set; }
    public string? Source { get; set; }
}
