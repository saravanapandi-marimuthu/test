using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Core.Models;
using Horizen.Core.Utilities;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Domain.RetailOrders.Enums;

namespace Horizen.Data.Domain.RetailOrders.Entities;

public class RetailOrder : BaseEntity
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = null!;
    public Guid RetailerCompanyId { get; set; }
    public Guid CustomerCompanyId { get; set; }
    public Guid UserId { get; set; }
    public string? Notes { get; set; }
    public RetailOrderExtendedProperties ExtendedProperties { get; set; } =
        new RetailOrderExtendedProperties();
    public RetailOrderStatusType Status { get; set; }
    public RetailOrderTypes OrderType { get; set; }
    public Company RetailerCompany { get; set; } = null!;
    public Company CustomerCompany { get; set; } = null!;
    public ICollection<PurchaseOrder> PurchaseOrders { get; set; } = null!;
    public ICollection<RetailOrderTag> OrderTags { get; set; } = null!;
    public ICollection<RetailOrderLineItem> OrderItems { get; set; } = null!;
    public ICollection<RetailOrderFieldInfo> RetailOrderFields { get; set; } = null!;

    [NotMapped]
    public List<EnumInfo<RetailOrderTypes>> OrderTypesInfo
    {
        get => EnumUtility.GetFlagsInfo(OrderType, RetailOrderTypes.None);
    }
}

public class RetailOrderExtendedProperties
{
    public string? Version { get; set; }
}
