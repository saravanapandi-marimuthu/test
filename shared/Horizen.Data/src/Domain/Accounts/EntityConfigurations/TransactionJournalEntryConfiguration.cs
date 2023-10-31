using Horizen.Data.Domain.Accounts.Entities;
using Horizen.Data.Domain.Common.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Accounts.EntityConfigurations;

public class TransactionJournalEntryConfiguration : BaseModelConfiguration<TransactionJournalEntry>
{
    public override void Configure(EntityTypeBuilder<TransactionJournalEntry> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.BillingAccount)
            .WithMany(e => e.JournalEntries)
            .HasForeignKey(e => e.BillingAccountId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
