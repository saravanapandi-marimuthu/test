using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Warehouses.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Warehouses.EntityConfigurations;

public class WarehousePhoneNumberConfiguration : BaseModelConfiguration<WarehousePhoneNumber>
{
    public override void Configure(EntityTypeBuilder<WarehousePhoneNumber> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.WarehouseId, e.PhoneNumberId });

        builder
            .HasOne(e => e.Warehouse)
            .WithMany(e => e.WarehousePhoneNumbers)
            .HasForeignKey(e => e.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.PhoneNumber)
            .WithMany()
            .HasForeignKey(e => e.PhoneNumberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
