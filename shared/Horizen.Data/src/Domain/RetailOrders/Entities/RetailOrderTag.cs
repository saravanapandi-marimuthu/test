using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.RetailOrders.Entities;

public class RetailOrderTag : BaseEntity
{
    public int OrderId { get; set; }
    public int TagId { get; set; }
    public RetailOrder Order { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
