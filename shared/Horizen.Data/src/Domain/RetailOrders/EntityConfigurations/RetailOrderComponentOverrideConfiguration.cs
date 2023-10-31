using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailOrders.EntityConfigurations;

public class RetailOrderComponentOverrideConfiguration
    : BaseModelConfiguration<RetailOrderComponentOverride>
{
    public override void Configure(EntityTypeBuilder<RetailOrderComponentOverride> builder)
    {
        base.Configure(builder);

        builder.HasKey(
            e =>
                new
                {
                    e.OrderItemId,
                    e.OrderComponentId,
                    e.RetailerProductComponentId
                }
        );

        builder
            .HasOne(e => e.OrderItem)
            .WithMany(e => e.OrderComponentOverrides)
            .HasForeignKey(e => e.OrderItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.OrderComponent)
            .WithMany()
            .HasForeignKey(e => e.OrderComponentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.UnitOfMeasurement)
            .WithMany()
            .HasForeignKey(e => e.UnitOfMeasurementId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
