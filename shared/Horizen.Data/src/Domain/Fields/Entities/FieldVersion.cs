using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Fields.Entities;

public class FieldVersion : BaseEntity
{
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool Active { get; set; }
    public int FieldId { get; set; }
    public float? EstimatedArea { get; set; }
    public float? CalculatedArea { get; set; }
    public string? Notes { get; set; }
    public Field Field { get; set; } = null!;
    public ICollection<FieldVersionTag> FieldVersionTags { get; set; } =
        new List<FieldVersionTag>();
    public ICollection<FieldLayer> FieldLayers { get; set; } = null!;
}
