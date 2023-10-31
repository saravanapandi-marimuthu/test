using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailerProducts.EntityConfigurations;

public class RetailerProductComponentConfiguration
    : BaseModelConfiguration<RetailerProductComponent>
{
    public override void Configure(EntityTypeBuilder<RetailerProductComponent> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(e => new { e.RetailerProductId, e.ManufacturerProductId });

        builder
            .HasOne(e => e.RetailerProduct)
            .WithMany(e => e.Components)
            .HasForeignKey(e => e.RetailerProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.ManufacturerProduct)
            .WithMany()
            .HasForeignKey(e => e.ManufacturerProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.UnitOfMeasurement)
            .WithMany()
            .HasForeignKey(e => e.UnitOfMeasurementId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.RetailerProductComponentCosts)
            .WithOne(e => e.RetailerProductComponent)
            .HasForeignKey(e => e.RetailerProductComponentId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
