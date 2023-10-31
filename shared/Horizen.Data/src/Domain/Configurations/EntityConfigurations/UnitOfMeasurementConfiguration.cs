using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Configurations.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Configurations.EntityConfigurations;

public class UnitOfMeasurementConfiguration : BaseModelConfiguration<UnitOfMeasurement>
{
    public override void Configure(EntityTypeBuilder<UnitOfMeasurement> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.NormalizedName).IsUnique();
        builder.Property(e => e.Name).IsRequired();

        builder
            .HasOne(e => e.BaseUnit)
            .WithMany(e => e.DependentUnits)
            .HasForeignKey(e => e.BaseUnitId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.NumeratorUnit)
            .WithMany()
            .HasForeignKey(e => e.NumeratorUnitId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.DenominatorUnit)
            .WithMany()
            .HasForeignKey(e => e.DenominatorUnitId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
