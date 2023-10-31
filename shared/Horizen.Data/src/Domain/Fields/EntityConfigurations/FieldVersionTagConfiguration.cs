using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Fields.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Fields.EntityConfigurations;

public class FieldVersionTagConfiguration : BaseModelConfiguration<FieldVersionTag>
{
    public override void Configure(EntityTypeBuilder<FieldVersionTag> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.FieldVersionId, e.TagId });

        builder
            .HasOne(e => e.FieldVersion)
            .WithMany(e => e.FieldVersionTags)
            .HasForeignKey(e => e.FieldVersionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Tag)
            .WithMany()
            .HasForeignKey(e => e.TagId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
