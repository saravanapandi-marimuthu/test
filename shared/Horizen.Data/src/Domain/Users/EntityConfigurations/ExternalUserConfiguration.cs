using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Users.EntityConfigurations;

public class ExternalUserConfiguration : BaseModelConfiguration<ExternalUser>
{
    public override void Configure(EntityTypeBuilder<ExternalUser> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.ExternalUserId).IsUnique();

        builder
            .HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
