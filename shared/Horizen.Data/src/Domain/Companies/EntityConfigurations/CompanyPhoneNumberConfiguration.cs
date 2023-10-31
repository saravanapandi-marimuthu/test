using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Companies.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Companies.EntityConfigurations;

public class CompanyPhoneNumberConfiguration : BaseModelConfiguration<CompanyPhoneNumber>
{
    public override void Configure(EntityTypeBuilder<CompanyPhoneNumber> builder)
    {
        base.Configure(builder);

        builder.HasKey(x => new { x.CompanyId, x.PhoneNumberId });

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.CompanyPhoneNumbers)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
