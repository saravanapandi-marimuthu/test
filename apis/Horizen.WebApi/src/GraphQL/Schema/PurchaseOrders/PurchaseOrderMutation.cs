using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Services.PurchaseOrders;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.PurchaseOrders;

[MutationType]
public class PurchaseOrderMutations : BaseGraphQLMutation
{
    public PurchaseOrderMutations(ILogger<PurchaseOrderMutations> logger)
        : base(logger) { }

    //[AuthorizeUser(Action = UserAction.Read, Resource = Resource.Company)]
    public async Task<PurchaseOrder?> CreatePurchaseOrderAsync(
        [Service] PurchaseOrderService purchaseOrderService,
        IResolverContext context,
        CreatePurchaseOrderInput input
    )
    {
        var result = await purchaseOrderService.CreatePurchaseOrderAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.CreatePurchaseOrderError, result.ErrorMessage);
        }

        return result.Value;
    }
}
