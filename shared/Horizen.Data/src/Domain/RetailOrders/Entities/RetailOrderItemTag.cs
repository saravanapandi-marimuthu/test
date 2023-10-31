using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.RetailOrders.Entities;

public class RetailOrderItemTag : BaseEntity
{
    public int OrderItemId { get; set; }
    public int TagId { get; set; }

    public RetailOrderLineItem OrderItem { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
