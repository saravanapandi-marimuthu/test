using Horizen.Core.Attributes;
using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Configurations.Entities;

public class TagCategory : BaseEntity
{
    public int Id { get; set; }

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = "";
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public int SortOrder { get; set; }
    public int ColorIndex { get; set; }
    public string? Icon { get; set; }
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();
}
