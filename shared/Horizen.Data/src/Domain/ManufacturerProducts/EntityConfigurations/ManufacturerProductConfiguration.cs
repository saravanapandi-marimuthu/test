using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.ManufacturerProducts.EntityConfigurations;

public class ManufacturerProductConfiguration : BaseModelConfiguration<ManufacturerProduct>
{
    public override void Configure(EntityTypeBuilder<ManufacturerProduct> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.NormalizedName).IsUnique();

        builder
            .HasOne(e => e.ManufacturerCompany)
            .WithMany()
            .HasForeignKey(e => e.ManufacturerCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.Prices)
            .WithOne(e => e.ManufacturerProduct)
            .HasForeignKey(e => e.ManufacturerProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.ProductAvailabilities)
            .WithOne(e => e.Product)
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.ProductDocuments)
            .WithOne(e => e.Product)
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
