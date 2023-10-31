namespace Horizen.GraphQL.Schema.Configurations.Errors;

public class DuplicateTagCategoryException : Exception
{
    public DuplicateTagCategoryException(string categoryName)
        : base($"Tag category with name  {categoryName} already exists.") { }
}
