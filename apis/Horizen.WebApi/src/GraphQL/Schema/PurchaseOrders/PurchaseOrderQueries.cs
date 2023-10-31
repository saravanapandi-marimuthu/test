using Horizen.Data.Services.Results;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Services.PurchaseOrders;
using Horizen.Data.Services.PurchaseOrders.Inputs;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[QueryType]
public class PurchaseOrderQueries : BaseGraphQLQuery
{
    public PurchaseOrderQueries(ILogger<PurchaseOrderQueries> logger)
        : base(logger) { }

    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.Product)]
    public async Task<CollectionResult<PurchaseOrder>?> GetPurchaseOrdersAsync(
        [Service] PurchaseOrderService purchaseOrderService,
        IResolverContext context,
        GetPurchaseOrdersInput input
    )
    {
        var result = await purchaseOrderService.GetPurchaseOrderAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetPurchaseOrdersError, result.ErrorMessage);
        }

        return result.Value;
    }
}
