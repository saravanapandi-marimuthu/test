using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Users.EntityConfigurations;

public class UserConfiguration : BaseModelConfiguration<User>
{
    public override void Configure(EntityTypeBuilder<User> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.NormalizedEmail).IsUnique();

        builder
            .HasMany(e => e.UserRoles)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.SelectedUserRole)
            .WithMany()
            .HasForeignKey(e => e.SelectedUserRoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.UserSettings)
            .WithOne(e => e.User)
            .HasForeignKey<UserSettings>(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(e => e.UserAddresses)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.UserPhoneNumbers)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.UserTags)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
