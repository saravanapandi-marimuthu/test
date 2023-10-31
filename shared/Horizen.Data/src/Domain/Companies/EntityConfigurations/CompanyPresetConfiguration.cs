using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Companies.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Companies.EntityConfigurations;

public class CompanyPresetConfiguration : BaseModelConfiguration<CompanyPreset>
{
    public override void Configure(EntityTypeBuilder<CompanyPreset> builder)
    {
        base.Configure(builder);
        builder.HasKey(e => e.CompanyId);

        builder.OwnsOne(e => e.ExtendedProperties);

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.CompanyPresets)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.DefaultPaymentTerm)
            .WithMany()
            .HasForeignKey(e => e.DefaultPaymentTermId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
