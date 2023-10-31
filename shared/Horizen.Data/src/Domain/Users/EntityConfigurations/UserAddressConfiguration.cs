using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Users.EntityConfigurations;

public class UserAddressConfiguration : BaseModelConfiguration<UserAddress>
{
    public override void Configure(EntityTypeBuilder<UserAddress> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.UserId, e.AddressId });

        builder
            .HasOne(e => e.User)
            .WithMany(e => e.UserAddresses)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Address)
            .WithMany()
            .HasForeignKey(e => e.AddressId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
