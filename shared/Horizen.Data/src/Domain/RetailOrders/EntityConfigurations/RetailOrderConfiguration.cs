using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailOrders.EntityConfigurations;

public class RetailOrderConfiguration : BaseModelConfiguration<RetailOrder>
{
    public override void Configure(EntityTypeBuilder<RetailOrder> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(e => new { e.RetailerCompanyId, e.OrderNumber });

        builder.OwnsOne(e => e.ExtendedProperties);

        builder
            .HasOne(e => e.RetailerCompany)
            .WithMany(e => e.RetailOrders)
            .HasForeignKey(e => e.RetailerCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.CustomerCompany)
            .WithMany(e => e.CustomerRetailOrders)
            .HasForeignKey(e => e.CustomerCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PurchaseOrders)
            .WithOne(e => e.RetailOrder)
            .HasForeignKey(e => e.RetailOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.OrderTags)
            .WithOne(e => e.Order)
            .HasForeignKey(e => e.OrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.OrderItems)
            .WithOne(e => e.Order)
            .HasForeignKey(e => e.OrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.RetailOrderFields)
            .WithOne(e => e.Order)
            .HasForeignKey(e => e.OrderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
