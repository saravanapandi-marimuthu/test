using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Users.EntityConfigurations;

public class UserInviteConfiguration : BaseModelConfiguration<UserInvite>
{
    public override void Configure(EntityTypeBuilder<UserInvite> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        //builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Property(e => e.NormalizedEmail).HasMaxLength(256);
        builder.HasIndex(e => e.NormalizedEmail).IsUnique();
        builder.Property(e => e.Email).IsRequired();

        builder
            .HasOne(e => e.Company)
            .WithMany()
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
