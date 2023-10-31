using HotChocolate.Resolvers;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Horizen.Data.Services.RetailerProducts;
using Horizen.Data.Services.RetailerProducts.Inputs;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[MutationType]
public class RetailerProductMutations : BaseGraphQLMutation
{
    public RetailerProductMutations(ILogger<RetailerProductMutations> logger)
        : base(logger) { }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<RetailerProduct?> CreateRetailerProductAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        CreateRetailerProductInput input
    )
    {
        var result = await retailerProductService.CreateRetailerProductAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.CreateRetailerProductError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<RetailerProduct?> UpdateRetailerProductAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        UpdateRetailerProductInput input
    )
    {
        var result = await retailerProductService.UpdateRetailerProductAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.UpdateRetailerProductError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<bool> DeleteRetailerProductAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        DeleteRetailerProductInput input
    )
    {
        var result = await retailerProductService.DeleteRetailerProductAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.DeleteRetailerProductError, result.ErrorMessage);
        }

        return result.IsSuccess;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<RetailerProductComponentCost?> CreateRetailerProductComponentCostAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        CreateRetailerProductComponentCostInput input
    )
    {
        var result = await retailerProductService.CreateRetailerProductComponentCostAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.UpdateRetailerProductError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<RetailerProductComponentCost?> UpdateRetailerProductComponentCostAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        UpdateRetailerProductComponentCostInput input
    )
    {
        var result = await retailerProductService.UpdateRetailerProductComponentCostAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.UpdateRetailerProductError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<RetailerProductPrice?> CreateRetailerProductPriceAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        CreateRetailerProductPriceInput input
    )
    {
        var result = await retailerProductService.CreateRetailerProductPriceAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.UpdateRetailerProductError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<RetailerProductPrice?> UpdateRetailerProductPriceAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        UpdateRetailerProductPriceInput input
    )
    {
        var result = await retailerProductService.UpdateRetailerProductPriceAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.UpdateRetailerProductError, result.ErrorMessage);
        }

        return result.Value;
    }
}
