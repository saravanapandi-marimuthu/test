using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.RetailOrders.Enums;

namespace Horizen.Data.Domain.RetailOrders.Entities;

public class RetailOrderLineItemSchedule : BaseEntity
{
    public int RetailOrderLineItemId { get; set; }
    public RetailOrderLineItemScheduleStatus ScheduleStatus { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public DateTime? StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public string? Notes { get; set; }
    public string? ScheduleStatusReason { get; set; }
}
