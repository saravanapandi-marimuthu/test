using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.ManufacturerProducts;
using Horizen.Data.Services.Results;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[QueryType]
public class ManufacturerProductQueries : BaseGraphQLQuery
{
    public ManufacturerProductQueries(ILogger<ManufacturerProductQueries> logger)
        : base(logger) { }

    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<CollectionResult<ManufacturerProduct>?> GetManufacturerProductsAsync(
        [Service] ManufacturerProductService manufacturerProductService,
        IResolverContext context,
        GetManufacturerProductsInput input
    )
    {
        var result = await manufacturerProductService.GetManufacturerProductAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetManufacturerProductsError, result.ErrorMessage);
        }

        return result.Value;
    }
}
