using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.ManufacturerProducts.EntityConfigurations;

public class ManufacturerPriceConfiguration : BaseModelConfiguration<ManufacturerPrice>
{
    public override void Configure(EntityTypeBuilder<ManufacturerPrice> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.ManufacturerProduct)
            .WithMany(p => p.Prices)
            .HasForeignKey(e => e.ManufacturerProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Package)
            .WithMany()
            .HasForeignKey(e => e.PackageId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
