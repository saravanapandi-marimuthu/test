using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.RetailerProducts.Entities;

namespace Horizen.Data.Domain.RetailOrders.Entities;

public class RetailOrderComponentOverride : BaseEntity
{
    public int OrderItemId { get; set; }
    public int OrderComponentId { get; set; }
    public int RetailerProductComponentId { get; set; }
    public int? UnitOfMeasurementId { get; set; }
    public decimal? MeasurementValue { get; set; }
    public decimal CompositionPercentage { get; set; } = 100;
    public UnitOfMeasurement UnitOfMeasurement { get; set; } = null!;
    public RetailOrderLineItem OrderItem { get; set; } = null!;
    public RetailerProductComponent OrderComponent { get; set; } = null!;
}
