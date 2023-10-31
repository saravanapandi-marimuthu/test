using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Inventory.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Inventory.EntityConfigurations;

public class InventoryItemLotInfoBarCodeEntryConfiguration
    : BaseModelConfiguration<InventoryItemLotInfoBarCodeEntry>
{
    public override void Configure(EntityTypeBuilder<InventoryItemLotInfoBarCodeEntry> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasAlternateKey(e => new { e.InventoryLotInfoId, e.Barcode });

        builder
            .HasOne(e => e.LotInfo)
            .WithMany(e => e.BarCodeEntries)
            .HasForeignKey(e => e.InventoryLotInfoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
