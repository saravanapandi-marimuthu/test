using Horizen.Data.Services.Configurations;
using Horizen.Data.Services.Configurations.Errors;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Data.Services.Results;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;
using Tag = Horizen.Data.Domain.Configurations.Entities.Tag;
using Horizen.Core.Models;
using Horizen.Data.Domain.ManufacturerProducts.Enums;
using Horizen.Data.Domain.UserRoles.Enums;
using Horizen.Data.Domain.RetailOrders.Entities;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[QueryType]
public class ConfigurationQueries : BaseGraphQLQuery
{
    public ConfigurationQueries(ILogger<ConfigurationQueries> logger)
        : base(logger) { }

    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.Configuration)]
    public async Task<CollectionResult<TagCategory>?> GetTagCategoriesAsync(
        [Service] TagService tagService,
        GetTagCategoriesInput input,
        IResolverContext context
    )
    {
        var result = await tagService.GetTagCategoriesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetTagCategoriesError, result.ErrorMessage);
            return null;
        }

        return result.Value;
    }

    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.Configuration)]
    public async Task<TagCategory?> GetTagCategoryByNameAsync(
        [Service] TagService tagService,
        string tagCategoryName
    )
    {
        var errors = new List<IError>();
        try
        {
            var result = await tagService.GetTagCategoryByNameAsync(tagCategoryName);
            if (result.IsSuccess && result.Value != null)
            {
                return result.Value;
            }
        }
        catch (TagCategoryNotFoundException ex)
        {
            _logger.LogError(ex, "Error getting tag category");
            errors.Add(
                ErrorBuilder.New().SetMessage(ex.Message).SetCode("TAG_CATEGORY_NOT_FOUND").Build()
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting tag category");
            errors.Add(ErrorBuilder.New().SetMessage(ex.Message).SetCode("UNKNOWN_ERROR").Build());
        }

        throw new GraphQLException(errors);
    }

    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.Configuration)]
    public async Task<CollectionResult<Tag>?> GetTagsByCategoryNameAsync(
        IResolverContext context,
        [Service] TagService tagService,
        GetTagsByCategoryNameInput input
    )
    {
        var result = await tagService.GetTagsByCategoryNameAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetTagsError, result.ErrorMessage);
            return null;
        }

        return result.Value;
    }

    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.Configuration)]
    public async Task<CollectionResult<UnitOfMeasurement>?> GetUnitOfMeasurementsAsync(
        IResolverContext context,
        [Service] UnitOfMeasurementService unitOfMeasurementService,
        GetUnitOfMeasurementsInput input
    )
    {
        var result = await unitOfMeasurementService.GetUnitOfMeasurementsAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetUnitOfMeasurementsError, result.ErrorMessage);
            return null;
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserAction.Read, Resource = Resource.Configuration)]
    public async Task<CollectionResult<PaymentTerm>?> GetPaymentTermsAsync(
        IResolverContext context,
        [Service] PaymentTermService paymentTermService,
        GetPaymentTermsInput input
    )
    {
        var result = await paymentTermService.GetPaymentTermsAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetPaymentTermsError, result.ErrorMessage);
            return null;
        }

        return result.Value;
    }

    public CollectionResult<EnumInfo<ProductCategory>> GetProductCategories()
    {
        return ConfigurationService.GetProductCategories();
    }

    public CollectionResult<EnumInfo<ProductType>> GetProductTypes()
    {
        return ConfigurationService.GetProductTypes();
    }

    public CollectionResult<EnumInfo<RoleTypes>> GetRoleTypes()
    {
        return ConfigurationService.GetRoleTypes();
    }

    public CollectionResult<EnumInfo<RetailOrderTypes>> GetRetailOrderTypes()
    {
        return ConfigurationService.GetRetailOrderTypes();
    }
}
