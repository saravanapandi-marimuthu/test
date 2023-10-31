using Horizen.Data.Services.Warehouses;
using Horizen.Data.Services.Warehouses.Inputs;
using Horizen.Data.Services.Results;
using HotChocolate.Resolvers;
using Horizen.Data.Domain.Warehouses.Entities;
using Horizen.Data.Domain.Auth.Services;

namespace Horizen.WebApi.GraphQL.Schema.Warehouses;

[QueryType]
public class WarehouseQueries : BaseGraphQLQuery
{
    public WarehouseQueries(ILogger<WarehouseQueries> logger)
        : base(logger) { }

    //[AuthorizeUser(Action = UserAction.Read, Resource = Resource.Configuration)]
    public async Task<Warehouse?> GetWarehouseAsync(
        [Service] WarehouseService warehouseService,
        GetWarehouseInput input,
        [Service] IAuthenticatedUserService authenticatedUserService,
        IResolverContext context
    )
    {
        var result = await warehouseService.GetWarehouseAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetWarehouseError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }

    // [AuthorizeUser(Action = UserAction.Read, Resource = Resource.Warehouse)]
    public async Task<CollectionResult<Warehouse>?> GetWarehousesAsync(
        [Service] WarehouseService warehouseService,
        GetWarehousesInput input,
        [Service] IAuthenticatedUserService authenticatedUserService,
        IResolverContext context
    )
    {
        Console.WriteLine($"User: {authenticatedUserService.AuthenticatedUser?.User.Email}");
        var result = await warehouseService.GetWarehousesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetWarehouseError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }

    public async Task<StorageLocation?> GetStorageLocationByIdAsync(
        [Service] WarehouseService warehouseService,
        GetStorageLocationByIdInput input,
        [Service] IAuthenticatedUserService authenticatedUserService,
        IResolverContext context
    )
    {
        var result = await warehouseService.GetStorageLocationByIdAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetWarehouseError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }

    public async Task<CollectionResult<StorageLocation>?> GetStorageLocationsAsync(
        [Service] WarehouseService warehouseService,
        GetStorageLocationsInput input,
        IResolverContext context
    )
    {
        var result = await warehouseService.GetStorageLocationsAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetWarehouseError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }
}
