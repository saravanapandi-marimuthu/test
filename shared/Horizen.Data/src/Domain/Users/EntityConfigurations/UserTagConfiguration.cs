using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Users.EntityConfigurations;

public class UserTagConfiguration : BaseModelConfiguration<UserTag>
{
    public override void Configure(EntityTypeBuilder<UserTag> builder)
    {
        base.Configure(builder);
        builder.HasKey(e => new { e.UserId, e.TagId });

        builder
            .HasOne(e => e.User)
            .WithMany(e => e.UserTags)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Tag)
            .WithMany()
            .HasForeignKey(e => e.TagId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
