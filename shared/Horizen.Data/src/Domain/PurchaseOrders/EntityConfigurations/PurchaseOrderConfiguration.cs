using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.PurchaseOrders.EntityConfigurations;

public class PurchaseOrderConfiguration : BaseModelConfiguration<PurchaseOrder>
{
    public override void Configure(EntityTypeBuilder<PurchaseOrder> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasAlternateKey(e => new { e.CompanyId, e.OrderNumber });

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.PurchaseOrders)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.VendorCompany)
            .WithMany(e => e.VendorPurchaseOrders)
            .HasForeignKey(e => e.VendorCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.PaymentTerm)
            .WithMany()
            .HasForeignKey(e => e.PaymentTermsId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PurchaseOrderLineItems)
            .WithOne(e => e.PurchaseOrder)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PurchaseOrderApprovers)
            .WithOne(e => e.PurchaseOrder)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PurchaseOrderFees)
            .WithOne(e => e.PurchaseOrder)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PurchaseOrderDiscounts)
            .WithOne(e => e.PurchaseOrder)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.RetailOrder)
            .WithMany(e => e.PurchaseOrders)
            .HasForeignKey(e => e.RetailOrderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
