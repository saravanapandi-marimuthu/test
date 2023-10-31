using Horizen.Data.Domain.EnterpriseItems.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Horizen.Data.Domain.Common.EntityConfigurations;

namespace Horizen.Data.Domain.EnterpriseItems.EntityConfigurations;

public class EnterpriseItemConfiguration : BaseModelConfiguration<EnterpriseItem>
{
    public override void Configure(EntityTypeBuilder<EnterpriseItem> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasAlternateKey(e => new { e.ItemId, e.ItemTypeId });

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.EnterpriseItems)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.ItemType)
            .WithMany()
            .HasForeignKey(e => e.ItemTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.BillingSplitGroup)
            .WithMany(e => e.EnterpriseItems)
            .HasForeignKey(e => e.BillingSplitGroupId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
