using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailOrders.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailOrders.EntityConfigurations;

public class RetailOrderLineItemScheduleConfiguration
    : BaseModelConfiguration<RetailOrderLineItemSchedule>
{
    public override void Configure(EntityTypeBuilder<RetailOrderLineItemSchedule> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.RetailOrderLineItemId);
    }
}
