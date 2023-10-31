using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailOrders.EntityConfigurations;

public class RetailOrderTagConfiguration : BaseModelConfiguration<RetailOrderTag>
{
    public override void Configure(EntityTypeBuilder<RetailOrderTag> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.OrderId, e.TagId });

        builder
            .HasOne(e => e.Order)
            .WithMany(e => e.OrderTags)
            .HasForeignKey(e => e.OrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Tag)
            .WithMany()
            .HasForeignKey(e => e.TagId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
