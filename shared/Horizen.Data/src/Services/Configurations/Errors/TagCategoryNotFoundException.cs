namespace Horizen.Data.Services.Configurations.Errors;

public class TagCategoryNotFoundException : Exception
{
    public TagCategoryNotFoundException(string categoryName)
        : base($"Tag category with name {categoryName} not found.") { }
}
