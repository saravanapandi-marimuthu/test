using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Configurations.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Configurations.EntityConfigurations;

public class TagConfiguration : BaseModelConfiguration<Tag>
{
    public override void Configure(EntityTypeBuilder<Tag> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => new { e.TagCategoryId, e.NormalizedName }).IsUnique();
        builder.Property(e => e.Name).IsRequired();

        builder
            .HasOne(e => e.TagCategory)
            .WithMany(e => e.Tags)
            .HasForeignKey(e => e.TagCategoryId);
    }
}
