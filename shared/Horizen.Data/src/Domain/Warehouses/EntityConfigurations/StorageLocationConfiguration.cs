using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Warehouses.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Warehouses.EntityConfigurations;

public class StorageLocationConfiguration : BaseModelConfiguration<StorageLocation>
{
    public override void Configure(EntityTypeBuilder<StorageLocation> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(100);

        builder
            .HasOne(e => e.Warehouse)
            .WithMany(e => e.StorageLocations)
            .HasForeignKey(e => e.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.StorageLocationType)
            .WithMany()
            .HasForeignKey(e => e.StorageLocationTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.ParentStorageLocation)
            .WithMany(e => e.ChildStorageLocations)
            .HasForeignKey(e => e.ParentStorageLocationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
