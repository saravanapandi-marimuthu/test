using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Fields.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Fields.EntityConfigurations;

public class FieldConfiguration : BaseModelConfiguration<Field>
{
    public override void Configure(EntityTypeBuilder<Field> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(e => new { e.CompanyId, e.NormalizedName });

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.Fields)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.FieldTags)
            .WithOne(e => e.Field)
            .HasForeignKey(e => e.FieldId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.FieldVersions)
            .WithOne(e => e.Field)
            .HasForeignKey(e => e.FieldId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.RetailOrdersByField)
            .WithOne(e => e.Field)
            .HasForeignKey(e => e.FieldId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.GeoLocation)
            .WithMany()
            .HasForeignKey(e => e.GeoLocationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
