using Horizen.Core.Extensions;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations.Inputs;

public class CreateTagInput
{
    public string TagCategoryName { get; set; } = "";
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public int? SortOrder { get; set; }
    public int? ColorIndex { get; set; }
    public string? Icon { get; set; }

    internal Tag ToTag()
    {
        return new Tag
        {
            NormalizedName = Name.ToHorizenNormalizedString(),
            Name = Name,
            Description = Description,
            SortOrder = SortOrder ?? 0,
            ColorIndex = ColorIndex ?? 0,
            Icon = Icon,
        };
    }
}
