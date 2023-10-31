using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailerProducts.EntityConfigurations;

public class RetailerProductConfiguration : BaseModelConfiguration<RetailerProduct>
{
    public override void Configure(EntityTypeBuilder<RetailerProduct> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.NormalizedName).IsUnique();

        builder
            .HasOne(e => e.RetailerCompany)
            .WithMany(e => e.RetailerProducts)
            .HasForeignKey(e => e.RetailerCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.Components)
            .WithOne(e => e.RetailerProduct)
            .HasForeignKey(e => e.RetailerProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.Prices)
            .WithOne(e => e.RetailerProduct)
            .HasForeignKey(e => e.RetailerProductId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
