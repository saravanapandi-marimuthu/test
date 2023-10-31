using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Warehouses.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Warehouses.EntityConfigurations;

public class WarehouseConfiguration : BaseModelConfiguration<Warehouse>
{
    public override void Configure(EntityTypeBuilder<Warehouse> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.RetailerCompany)
            .WithMany(e => e.Warehouses)
            .HasForeignKey(e => e.RetailerCompanyId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(e => e.WarehouseAddresses)
            .WithOne(e => e.Warehouse)
            .HasForeignKey(e => e.WarehouseId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(e => e.WarehousePhoneNumbers)
            .WithOne(e => e.Warehouse)
            .HasForeignKey(e => e.WarehouseId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(e => e.StorageLocations)
            .WithOne(e => e.Warehouse)
            .HasForeignKey(e => e.WarehouseId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
