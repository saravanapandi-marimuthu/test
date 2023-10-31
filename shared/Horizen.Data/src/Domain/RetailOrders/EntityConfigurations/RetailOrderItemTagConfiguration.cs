using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailOrders.EntityConfigurations;

public class RetailOrderItemTagConfiguration : BaseModelConfiguration<RetailOrderItemTag>
{
    public override void Configure(EntityTypeBuilder<RetailOrderItemTag> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.OrderItemId, e.TagId });

        builder
            .HasOne(e => e.OrderItem)
            .WithMany(e => e.OrderItemTags)
            .HasForeignKey(e => e.OrderItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Tag)
            .WithMany()
            .HasForeignKey(e => e.TagId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
