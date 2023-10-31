using Horizen.Data.Domain.Billing.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Horizen.Data.Domain.Common.EntityConfigurations;

namespace Horizen.Data.Domain.Billing.EntityConfigurations;

public class BillingAccountSplitAllocationConfiguration
    : BaseModelConfiguration<BillingAccountSplitAllocation>
{
    public override void Configure(EntityTypeBuilder<BillingAccountSplitAllocation> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.SplitGroupAccountId, e.SplitItemId });

        builder
            .HasOne(e => e.SplitItem)
            .WithMany(e => e.BillingAccountSplitAllocations)
            .HasForeignKey(e => e.SplitGroupAccountId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
