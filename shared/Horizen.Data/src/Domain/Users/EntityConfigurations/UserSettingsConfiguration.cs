using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Users.EntityConfigurations;

public class UserSettingsConfiguration : BaseModelConfiguration<UserSettings>
{
    public override void Configure(EntityTypeBuilder<UserSettings> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.UserId);

        builder
            .HasOne(e => e.User)
            .WithOne(e => e.UserSettings)
            .HasForeignKey<UserSettings>(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
