using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations.Results;

public class TagCategoriesResult
{
    public List<TagCategory> TagCategories { get; set; } = new List<TagCategory>();
    public int TotalCount { get; set; }
}
