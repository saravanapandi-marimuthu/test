using Horizen.Data.Services.Warehouses;
using Horizen.Data.Services.Warehouses.Inputs;
using Horizen.Data.Domain.Warehouses.Entities;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.Warehouses;

[MutationType]
public class WarehouseMutations : BaseGraphQLMutation
{
    public WarehouseMutations(ILogger<WarehouseMutations> logger)
        : base(logger) { }

    public async Task<Warehouse> CreateWarehouseAsync(
        [Service] WarehouseService warehouseService,
        IResolverContext context,
        CreateWarehouseInput input
    )
    {
        var result = await warehouseService.CreateWarehouseAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.CreateWarehouseError, result.ErrorMessage);
        }

        if (result.Value is null)
        {
            _logger.LogError("Error creating warehouse address");

            var error = ErrorBuilder
                .New()
                .SetMessage("Error creating warehouse address")
                .SetCode("UNEXPECTED_ERROR")
                .Build();

            throw new GraphQLException(error);
        }

        return result.Value!;
    }

    public async Task<StorageLocation?> CreateStorageLocationAsync(
        [Service] WarehouseService warehouseService,
        IResolverContext context,
        CreateStorageLocationInput input
    )
    {
        var result = await warehouseService.CreateStorageLocationAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.CreateStorageLocationError, result.ErrorMessage);
        }

        return result.Value;
    }

    public async Task<StorageLocation?> UpdateStorageLocationAsync(
        [Service] WarehouseService warehouseService,
        IResolverContext context,
        UpdateStorageLocationInput input
    )
    {
        var result = await warehouseService.UpdateStorageLocationAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.UpdateStorageLocationError, result.ErrorMessage);
        }

        return result.Value;
    }
}
