using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Fields.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Fields.EntityConfigurations;

public class FieldTagConfiguration : BaseModelConfiguration<FieldTag>
{
    public override void Configure(EntityTypeBuilder<FieldTag> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.FieldId, e.TagId });

        builder
            .HasOne(e => e.Field)
            .WithMany(e => e.FieldTags)
            .HasForeignKey(e => e.FieldId)
            .OnDelete(DeleteBehavior.Restrict);
        builder
            .HasOne(e => e.Tag)
            .WithMany()
            .HasForeignKey(e => e.TagId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
