using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.UserRoles.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.UserRoles.EntityConfigurations;

public class UserRoleConfiguration : BaseModelConfiguration<UserRole>
{
    public override void Configure(EntityTypeBuilder<UserRole> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasAlternateKey(e => new { e.UserId, e.CompanyId });

        builder.Property(e => e.RoleType).HasColumnType("int");

        builder
            .HasOne(e => e.User)
            .WithMany(e => e.UserRoles)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.UserRoles)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
