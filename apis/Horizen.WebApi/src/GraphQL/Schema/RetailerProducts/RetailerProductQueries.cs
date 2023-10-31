using Horizen.Data.Services.Results;
using HotChocolate.Resolvers;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Horizen.Data.Services.RetailerProducts;
using Horizen.Data.Services.RetailerProducts.Inputs;
using Horizen.Core.Models;
using Horizen.Data.Domain.ManufacturerProducts.Enums;
using Horizen.Data.Domain.RetailerProducts.Views;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[QueryType]
public class RetailerProductQueries : BaseGraphQLQuery
{
    public RetailerProductQueries(ILogger<RetailerProductQueries> logger)
        : base(logger) { }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<CollectionResult<RetailerProduct>?> GetRetailerProductsAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        GetRetailerProductsInput input
    )
    {
        var result = await retailerProductService.GetRetailerProductsAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetRetailerProductsError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<RetailerProduct?> GetRetailerProductAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        GetRetailerProductInput input
    )
    {
        var result = await retailerProductService.GetRetailerProductAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetRetailerProductError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<CollectionResult<RetailerProductComponent>?> GetRetailerProductComponentsAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        GetRetailerProductComponentsInput input
    )
    {
        var result = await retailerProductService.GetRetailerProductComponentsAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetRetailerProductsError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<CollectionResult<RetailerProductComponentCostView>?> GetRetailerProductComponentCostsAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        GetRetailerProductComponentCostsInput input
    )
    {
        var result = await retailerProductService.GetRetailerProductComponentCostsAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetRetailerProductsError, result.ErrorMessage);
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<CollectionResult<RetailerProductPriceView>?> GetRetailerProductPricesAsync(
        [Service] RetailerProductService retailerProductService,
        IResolverContext context,
        GetRetailerProductPricesInput input
    )
    {
        var result = await retailerProductService.GetRetailerProductPricesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetRetailerProductsError, result.ErrorMessage);
        }

        return result.Value;
    }
}
