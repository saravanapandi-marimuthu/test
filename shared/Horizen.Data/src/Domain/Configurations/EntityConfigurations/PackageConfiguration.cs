using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Configurations.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Configurations.EntityConfigurations;

public class PackageConfiguration : BaseModelConfiguration<Package>
{
    public override void Configure(EntityTypeBuilder<Package> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.NormalizedName).IsUnique();
        builder.Property(e => e.Name).IsRequired();

        builder
            .HasOne(e => e.BasePackage)
            .WithMany(e => e.DependentPackages)
            .HasForeignKey(e => e.BasePackageId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Unit)
            .WithMany(e => e.Packages)
            .HasForeignKey(e => e.UnitId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
