using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.PurchaseOrders.EntityConfigurations;

public class PurchaseOrderDiscountConfiguration : BaseModelConfiguration<PurchaseOrderDiscount>
{
    public override void Configure(EntityTypeBuilder<PurchaseOrderDiscount> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.PurchaseOrder)
            .WithMany(e => e.PurchaseOrderDiscounts)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.LineItem)
            .WithMany(e => e.PurchaseOrderDiscounts)
            .HasForeignKey(e => e.LineItemId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
