using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Inventory.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Inventory.EntityConfigurations;

public class InventoryItemConfiguration : BaseModelConfiguration<InventoryItem>
{
    public override void Configure(EntityTypeBuilder<InventoryItem> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasAlternateKey(
            e =>
                new
                {
                    e.ProductId,
                    e.WarehouseId,
                    e.CompanyId,
                    e.StorageLocationId
                }
        );

        builder
            .HasOne(e => e.Product)
            .WithMany()
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Warehouse)
            .WithMany()
            .HasForeignKey(e => e.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Company)
            .WithMany()
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.UnitOfMeasurement)
            .WithMany()
            .HasForeignKey(e => e.UnitOfMeasurementId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.LedgerEntries)
            .WithOne(e => e.InventoryItem)
            .HasForeignKey(e => e.InventoryItemId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
