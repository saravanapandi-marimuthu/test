using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Horizen.Data.Domain.RetailOrders.Enums;

namespace Horizen.Data.Domain.RetailOrders.Entities;

public partial class RetailOrderLineItem : BaseEntity
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ItemTypeId { get; set; }
    public int RetailerProductId { get; set; }
    public int Quantity { get; set; }
    public int? UnitOfMeasurementId { get; set; }
    public int? PackageId { get; set; }
    public int? PackageQuantity { get; set; }
    public float Price { get; set; }
    public int? ScheduleId { get; set; }
    public string? Notes { get; set; }
    public RetailOrderItemStatusType Status { get; set; }
    public RetailOrder Order { get; set; } = null!;
    public RetailerProduct RetailerProduct { get; set; } = null!;
    public Tag ItemType { get; set; } = null!;
    public UnitOfMeasurement? UnitOfMeasurement { get; set; }
    public Package? Package { get; set; }
    public RetailOrderLineItemSchedule? Schedule { get; set; }

    public ICollection<RetailOrderItemTag> OrderItemTags { get; set; } = null!;
    public ICollection<RetailOrderComponentOverride> OrderComponentOverrides { get; set; } = null!;
}
