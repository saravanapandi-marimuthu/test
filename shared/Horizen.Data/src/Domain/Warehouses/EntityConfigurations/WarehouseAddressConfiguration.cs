using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Warehouses.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Warehouses.EntityConfigurations;

public class WarehouseAddressConfiguration : BaseModelConfiguration<WarehouseAddress>
{
    public override void Configure(EntityTypeBuilder<WarehouseAddress> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.WarehouseId, e.AddressId });

        builder
            .HasOne(e => e.Warehouse)
            .WithMany(e => e.WarehouseAddresses)
            .HasForeignKey(e => e.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Address)
            .WithMany()
            .HasForeignKey(e => e.AddressId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
