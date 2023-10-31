using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Users.EntityConfigurations;

public class UserPhoneNumberConfiguration : BaseModelConfiguration<UserPhoneNumber>
{
    public override void Configure(EntityTypeBuilder<UserPhoneNumber> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.UserId, e.PhoneNumberId });

        builder
            .HasOne(e => e.User)
            .WithMany(e => e.UserPhoneNumbers)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.PhoneNumber)
            .WithMany()
            .HasForeignKey(e => e.PhoneNumberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
