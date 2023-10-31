using Horizen.Data.Domain.Accounts.Entities;
using Horizen.Data.Domain.Common.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Accounts.EntityConfigurations;

public class BillingAccountConfiguration : BaseModelConfiguration<BillingAccount>
{
    public override void Configure(EntityTypeBuilder<BillingAccount> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.OwnsOne(e => e.ExtendedProperties);

        builder
            .HasMany(e => e.JournalEntries)
            .WithOne(e => e.BillingAccount)
            .HasForeignKey(e => e.BillingAccountId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
