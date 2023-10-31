using Horizen.Data.Domain.Billing.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Horizen.Data.Domain.Common.EntityConfigurations;

namespace Horizen.Data.Domain.Billing.EntityConfigurations;

public class BillingSplitGroupAccountConfiguration
    : BaseModelConfiguration<BillingSplitGroupAccount>
{
    public override void Configure(EntityTypeBuilder<BillingSplitGroupAccount> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.SplitGroup)
            .WithMany(e => e.BillingSplitGroupAccounts)
            .HasForeignKey(e => e.SplitGroupId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.AccountCompany)
            .WithMany(e => e.BillingSplitGroupAccounts)
            .HasForeignKey(e => e.AccountCompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
