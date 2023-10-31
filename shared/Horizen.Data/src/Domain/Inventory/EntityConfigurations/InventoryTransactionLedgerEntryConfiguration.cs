using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Inventory.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Inventory.EntityConfigurations;

public class InventoryTransactionLedgerEntryConfiguration
    : BaseModelConfiguration<InventoryTransactionLedgerEntry>
{
    public override void Configure(EntityTypeBuilder<InventoryTransactionLedgerEntry> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.Package)
            .WithMany()
            .HasForeignKey(e => e.PackageId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.InventoryItem)
            .WithMany(e => e.LedgerEntries)
            .HasForeignKey(e => e.InventoryItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.PurchaseOrder)
            .WithMany()
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.PurchaseOrderLineItem)
            .WithMany()
            .HasForeignKey(e => e.PurchaseOrderLineItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.RetailOrder)
            .WithMany()
            .HasForeignKey(e => e.RetailOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.RetailOrderLineItem)
            .WithMany()
            .HasForeignKey(e => e.RetailOrderLineItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.InventoryItemLots)
            .WithOne(e => e.LedgerEntry)
            .HasForeignKey(e => e.InventoryTransactionLedgerEntryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
