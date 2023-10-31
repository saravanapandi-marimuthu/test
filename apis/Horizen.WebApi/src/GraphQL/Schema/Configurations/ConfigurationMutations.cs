using Horizen.Data.Services.Configurations;
using Horizen.GraphQL.Schema.Configurations.Errors;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Data.Domain.Configurations.Entities;
using Tag = Horizen.Data.Domain.Configurations.Entities.Tag;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[MutationType]
public class ConfigurationMutation : BaseGraphQLMutation
{
    public ConfigurationMutation(ILogger<ConfigurationMutation> logger)
        : base(logger) { }

    [Error<DuplicateTagCategoryException>]
    public async Task<TagCategory> CreateTagCategoryAsync(
        CreateTagCategoryInput input,
        [Service] TagService tagService
    )
    {
        var errors = new List<Exception>();

        var result = await tagService.CreateTagCategoryAsync(input);
        if (result.IsSuccess && result.Value != null)
        {
            return result.Value;
        }
        else
        {
            errors.Add(new DuplicateTagCategoryException(input.Name));
        }

        throw new AggregateException(errors);
    }

    [Error<DuplicateTagCategoryException>]
    public async Task<TagCategory> UpdateTagCategory(
        UpdateTagCategoryInput input,
        [Service] TagService tagService
    )
    {
        var errors = new List<Exception>();

        var result = await tagService.UpdateTagCategoryAsync(input);

        if (result.IsSuccess && result.Value != null)
        {
            return result.Value;
        }
        else
        {
            errors.Add(new DuplicateTagCategoryException(input.Name));
        }

        throw new AggregateException(errors);
    }

    public async Task<Tag> CreateTagAsync(CreateTagInput input, [Service] TagService tagService)
    {
        var errors = new List<Exception>();
        var result = await tagService.CreateTagAsync(input, "System");

        if (result.IsSuccess && result.Value != null)
        {
            return result.Value;
        }
        else
        {
            errors.Add(new DuplicateTagCategoryException(input.Name));
        }

        throw new AggregateException(errors);
    }
}
