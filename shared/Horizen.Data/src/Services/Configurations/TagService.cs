using Horizen.Data.Context;
using Horizen.Core.Extensions;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Data.Services.Results;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using Horizen.Data.Attributes;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations;

[DataService]
public class TagService
{
    private readonly HorizenDbContext _context;
    private readonly IDatabase _redisDb;

    public TagService(HorizenDbContext context, IConnectionMultiplexer redis)
    {
        _context = context;
        _redisDb = redis.GetDatabase();
    }

    #region TagCategory CRUD methods
    public async Task<Result<TagCategory>> CreateTagCategoryAsync(
        CreateTagCategoryInput input,
        string createdBy = "System"
    )
    {
        if (
            _context.TagCategories.Any(
                tc => tc.NormalizedName == input.Name.ToHorizenNormalizedString()
            )
        )
        {
            return Result<TagCategory>.Failure(
                $"TagCategory with name {input.Name} already exists"
            );
        }

        var category = input.ToTagCategory();
        category.CreatedBy = createdBy;

        category.Tags.ToList().ForEach(t => t.CreatedBy = createdBy);

        _context.TagCategories.Add(category);
        await _context.SaveChangesAsync();
        return Result<TagCategory>.Success(category);
    }

    public async Task<Result<CollectionResult<TagCategory>>> GetTagCategoriesAsync(
        GetTagCategoriesInput input
    )
    {
        var query = _context.TagCategories
            .Include(t => t.Tags)
            .Where(t => t.NormalizedName.Contains(input.NormalizedSearchTerm));

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var totalCount = await _context.TagCategories.CountAsync();

        var list = await query.ToListAsync();

        return Result<CollectionResult<TagCategory>>.Success(
            new CollectionResult<TagCategory> { Items = list, TotalCount = totalCount, }
        );
    }

    public async Task<Result<TagCategory>> GetTagCategoryByNameAsync(string tagCategoryName)
    {
        var tagCategory = await _context.TagCategories
            .Include(tc => tc.Tags)
            .FirstOrDefaultAsync(
                tc => tc.NormalizedName == tagCategoryName.ToHorizenNormalizedString()
            );

        if (tagCategory is null)
        {
            return Result<TagCategory>.Failure(
                $"TagCategory with name {tagCategoryName} not found."
            );
        }

        return Result<TagCategory>.Success(tagCategory);
    }

    public async Task<Result<TagCategory>> UpdateTagCategoryAsync(
        UpdateTagCategoryInput input,
        string updatedBy = "System"
    )
    {
        var existingTagCategory = _context.TagCategories.Find(input.Id);

        if (existingTagCategory is null)
        {
            return Result<TagCategory>.Failure($"TagCategory with ID {input.Id} not found.");
        }

        existingTagCategory.NormalizedName = input.Name.ToHorizenNormalizedString();
        existingTagCategory.Name = input.Name;
        existingTagCategory.Description = input.Description;
        existingTagCategory.SortOrder = input.SortOrder;
        existingTagCategory.ColorIndex = input.ColorIndex;
        existingTagCategory.UpdatedBy = updatedBy;
        existingTagCategory.Icon = input.Icon;

        _context.TagCategories.Update(existingTagCategory);
        await _context.SaveChangesAsync();

        return Result<TagCategory>.Success(existingTagCategory);
    }

    public async Task<Result> DeleteTagCategoryAsync(TagCategory category)
    {
        _context.TagCategories.Remove(category);
        var result = await _context.SaveChangesAsync();

        if (result < 0)
        {
            return Result.Failure("Error deleting tag category");
        }

        return Result.Success();
    }

    #endregion


    #region Tag CRUD methods
    public async Task<Result<Tag>> CreateTagAsync(CreateTagInput input, string createdBy)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var tagCategory = await _context.TagCategories
                .Where(tc => tc.NormalizedName == input.TagCategoryName.ToHorizenNormalizedString())
                .FirstOrDefaultAsync();

            if (tagCategory is null)
            {
                return Result<Tag>.Failure(
                    $"TagCategory with name {input.TagCategoryName} not found."
                );
            }

            var tag = input.ToTag();

            _context.Tags.Add(input.ToTag());
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return Result<Tag>.Success(tag);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            Console.WriteLine(ex.Message);
            return Result<Tag>.Failure(ex.Message);
        }
    }

    public async Task<Result<CollectionResult<Tag>>> GetTagsByCategoryNameAsync(
        GetTagsByCategoryNameInput input
    )
    {
        var items = await _context.Tags
            .Include(t => t.TagCategory)
            .Where(
                t => t.TagCategory.NormalizedName == input.CategoryName.ToHorizenNormalizedString()
            )
            .ToListAsync();

        return Result<CollectionResult<Tag>>.Success(
            new CollectionResult<Tag> { Items = items, TotalCount = items.Count, }
        );
    }

    public async Task<Result<Tag>> UpdateTagAsync(UpdateTagInput input, string updatedBy = "System")
    {
        var existingTag = _context.Tags.Find(input.Id);

        if (existingTag is null)
        {
            return Result<Tag>.Failure($"Tag with ID {input.Id} not found.");
        }

        existingTag.NormalizedName = input.Name.ToHorizenNormalizedString();
        existingTag.Name = input.Name;
        existingTag.Description = input.Description;
        existingTag.SortOrder = input.SortOrder ?? 0;
        existingTag.ColorIndex = input.ColorIndex ?? 0;
        existingTag.UpdatedBy = updatedBy;
        existingTag.Icon = input.Icon;

        _context.Tags.Update(existingTag);
        await _context.SaveChangesAsync();

        //_redisDb.StringSet($"Tag:{existingTag.Id}", JsonSerializer.Serialize(existingTag));

        return Result<Tag>.Success(existingTag);
    }

    public Task DeleteTag(Tag tag)
    {
        _context.Tags.Remove(tag);
        return _context.SaveChangesAsync();
    }

    public async Task<Result<Tag?>> GetTagByIdAsync(int id)
    {
        var result = await _context.Tags
            .Include(t => t.TagCategory)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (result is null)
        {
            return Result<Tag?>.Failure($"Tag with ID {id} not found.");
        }

        return Result<Tag?>.Success(result);
    }

    #endregion
}
