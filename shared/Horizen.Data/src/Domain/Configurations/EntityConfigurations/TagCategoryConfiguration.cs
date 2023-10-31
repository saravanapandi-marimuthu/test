using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Configurations.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Configurations.EntityConfigurations;

public class TagCategoryConfiguration : BaseModelConfiguration<TagCategory>
{
    public override void Configure(EntityTypeBuilder<TagCategory> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.NormalizedName).IsUnique();
        builder.Property(e => e.Name).IsRequired();

        builder
            .HasMany(e => e.Tags)
            .WithOne(e => e.TagCategory)
            .HasForeignKey(e => e.TagCategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        // // Explicitly set Id to auto-increment
        // builder.Property(e => e.Id).ValueGeneratedOnAdd();
    }
}
