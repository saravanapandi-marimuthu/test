using Horizen.Data.Domain.Billing.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Horizen.Data.Domain.Common.EntityConfigurations;

namespace Horizen.Data.Domain.Billing.EntityConfigurations;

public class BillingSplitItemConfiguration : BaseModelConfiguration<BillingSplitItem>
{
    public override void Configure(EntityTypeBuilder<BillingSplitItem> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.SplitGroup)
            .WithMany(e => e.SplitItems)
            .HasForeignKey(e => e.SplitGroupId)
            .OnDelete(DeleteBehavior.Restrict);
        builder
            .HasOne(e => e.ParentSplitItem)
            .WithMany(e => e.ChildSplitItems)
            .HasForeignKey(e => e.ParentSplitItemId)
            .OnDelete(DeleteBehavior.Restrict);
        builder
            .HasOne(e => e.SplitTier)
            .WithMany()
            .HasForeignKey(e => e.SplitTierId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
