using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Inventory.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Inventory.EntityConfigurations;

public class InventoryItemLotInfoConfiguration : BaseModelConfiguration<InventoryItemLotInfo>
{
    public override void Configure(EntityTypeBuilder<InventoryItemLotInfo> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasAlternateKey(e => new { e.InventoryTransactionLedgerEntryId, e.LotNumber });

        builder
            .HasOne(e => e.LedgerEntry)
            .WithMany(e => e.InventoryItemLots)
            .HasForeignKey(e => e.InventoryTransactionLedgerEntryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.BarCodeEntries)
            .WithOne(e => e.LotInfo)
            .HasForeignKey(e => e.InventoryLotInfoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
