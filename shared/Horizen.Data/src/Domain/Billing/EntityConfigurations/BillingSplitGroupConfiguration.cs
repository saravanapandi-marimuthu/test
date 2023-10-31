using Horizen.Data.Domain.Billing.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Horizen.Data.Domain.Common.EntityConfigurations;

namespace Horizen.Data.Domain.Billing.EntityConfigurations;

public class BillingSplitGroupConfiguration : BaseModelConfiguration<BillingSplitGroup>
{
    public override void Configure(EntityTypeBuilder<BillingSplitGroup> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder
            .HasOne(e => e.DefaultSplitItem)
            .WithMany()
            .HasForeignKey(e => e.DefaultSplitItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.EnterpriseItems)
            .WithOne(e => e.BillingSplitGroup)
            .HasForeignKey(e => e.BillingSplitGroupId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.BillingSplitGroupAccounts)
            .WithOne(e => e.SplitGroup)
            .HasForeignKey(e => e.SplitGroupId)
            .OnDelete(DeleteBehavior.Restrict);
        builder
            .HasMany(e => e.SplitItems)
            .WithOne(e => e.SplitGroup)
            .HasForeignKey(e => e.SplitGroupId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
