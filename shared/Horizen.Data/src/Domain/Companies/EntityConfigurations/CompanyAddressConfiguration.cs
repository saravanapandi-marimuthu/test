using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Companies.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Companies.EntityConfigurations;

public class CompanyAddressConfiguration : BaseModelConfiguration<CompanyAddress>
{
    public override void Configure(EntityTypeBuilder<CompanyAddress> builder)
    {
        base.Configure(builder);

        builder.HasKey(x => new { x.CompanyId, x.AddressId });

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.CompanyAddresses)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
