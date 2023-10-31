using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailerProducts.EntityConfigurations;

public class RetailerProductComponentCostConfiguration
    : BaseModelConfiguration<RetailerProductComponentCost>
{
    public override void Configure(EntityTypeBuilder<RetailerProductComponentCost> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(
            e =>
                new
                {
                    e.RetailerProductComponentId,
                    e.IsCostOverridden,
                    e.PackageId,
                    e.StartDate
                }
        );

        builder
            .HasOne(e => e.Package)
            .WithMany()
            .HasForeignKey(e => e.PackageId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.RetailerProductComponent)
            .WithMany(e => e.RetailerProductComponentCosts)
            .HasForeignKey(e => e.RetailerProductComponentId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
