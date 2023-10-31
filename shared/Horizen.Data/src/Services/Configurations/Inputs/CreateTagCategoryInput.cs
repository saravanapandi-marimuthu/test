using Horizen.Core.Extensions;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations.Inputs;

public class CreateTagCategoryInput
{
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public int SortOrder { get; set; }
    public int ColorIndex { get; set; }
    public string? Icon { get; set; }

    public List<CreateTagInput> Tags { get; set; } = new List<CreateTagInput>();

    public TagCategory ToTagCategory()
    {
        return new TagCategory
        {
            NormalizedName = Name.ToHorizenNormalizedString(),
            Name = Name,
            Description = Description,
            SortOrder = SortOrder,
            ColorIndex = ColorIndex,
            Icon = Icon,
            Tags = Tags.Select(t => t.ToTag()).ToList(),
        };
    }
}
