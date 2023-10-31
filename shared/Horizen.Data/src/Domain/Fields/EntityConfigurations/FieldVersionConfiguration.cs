using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Fields.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Fields.EntityConfigurations;

public class FieldVersionConfiguration : BaseModelConfiguration<FieldVersion>
{
    public override void Configure(EntityTypeBuilder<FieldVersion> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.Field)
            .WithMany(e => e.FieldVersions)
            .HasForeignKey(e => e.FieldId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.FieldVersionTags)
            .WithOne(e => e.FieldVersion)
            .HasForeignKey(e => e.FieldVersionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.FieldLayers)
            .WithOne(e => e.FieldVersion)
            .HasForeignKey(e => e.FieldVersionId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
