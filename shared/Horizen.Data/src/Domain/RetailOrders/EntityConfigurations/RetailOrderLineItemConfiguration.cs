using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailOrders.EntityConfigurations;

public class RetailOrderLineItemConfiguration : BaseModelConfiguration<RetailOrderLineItem>
{
    public override void Configure(EntityTypeBuilder<RetailOrderLineItem> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.Order)
            .WithMany(e => e.OrderItems)
            .HasForeignKey(e => e.OrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.RetailerProduct)
            .WithMany()
            .HasForeignKey(e => e.RetailerProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.ItemType)
            .WithMany()
            .HasForeignKey(e => e.ItemTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.UnitOfMeasurement)
            .WithMany()
            .HasForeignKey(e => e.UnitOfMeasurementId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Package)
            .WithMany()
            .HasForeignKey(e => e.PackageId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.OrderItemTags)
            .WithOne(e => e.OrderItem)
            .HasForeignKey(e => e.OrderItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.OrderComponentOverrides)
            .WithOne(e => e.OrderItem)
            .HasForeignKey(e => e.OrderItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Schedule)
            .WithMany()
            .HasForeignKey(e => e.ScheduleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
