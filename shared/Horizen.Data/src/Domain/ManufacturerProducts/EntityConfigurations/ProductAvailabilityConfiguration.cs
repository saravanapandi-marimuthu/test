using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.ManufacturerProducts.EntityConfigurations;

public class ProductAvailabilityConfiguration : BaseModelConfiguration<ProductAvailability>
{
    public override void Configure(EntityTypeBuilder<ProductAvailability> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.Product)
            .WithMany(e => e.ProductAvailabilities)
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
