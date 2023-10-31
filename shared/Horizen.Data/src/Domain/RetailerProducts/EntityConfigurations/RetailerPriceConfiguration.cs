using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailerProducts.EntityConfigurations;

public class RetailerPriceConfiguration : BaseModelConfiguration<RetailerProductPrice>
{
    public override void Configure(EntityTypeBuilder<RetailerProductPrice> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(
            e =>
                new
                {
                    e.RetailerProductId,
                    e.IsPriceOverridden,
                    e.PackageId,
                    e.StartDate
                }
        );

        builder
            .HasOne(e => e.RetailerProduct)
            .WithMany(e => e.Prices)
            .HasForeignKey(e => e.RetailerProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Package)
            .WithMany()
            .HasForeignKey(e => e.PackageId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
