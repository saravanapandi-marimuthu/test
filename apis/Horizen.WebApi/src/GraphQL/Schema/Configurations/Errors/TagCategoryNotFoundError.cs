namespace Horizen.GraphQL.Schema.Configurations.Errors;

public class TagCategoryNotFoundError : Error
{
    public TagCategoryNotFoundError(string message)
        : base(message, "TAG_CATEGORY_NOT_FOUND") { }
}
