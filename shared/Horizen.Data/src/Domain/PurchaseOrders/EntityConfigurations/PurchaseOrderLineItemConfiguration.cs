using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.PurchaseOrders.EntityConfigurations;

public class PurchaseOrderLineItemConfiguration : BaseModelConfiguration<PurchaseOrderLineItem>
{
    public override void Configure(EntityTypeBuilder<PurchaseOrderLineItem> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.PurchaseOrder)
            .WithMany(e => e.PurchaseOrderLineItems)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Product)
            .WithMany()
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Package)
            .WithMany()
            .HasForeignKey(e => e.PackageId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PurchaseOrderDiscounts)
            .WithOne(e => e.LineItem)
            .HasForeignKey(e => e.LineItemId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
