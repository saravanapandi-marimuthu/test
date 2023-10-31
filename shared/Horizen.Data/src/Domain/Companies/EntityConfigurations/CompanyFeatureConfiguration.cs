using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Companies.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Companies.EntityConfigurations;

public class CompanyFeatureConfiguration : BaseModelConfiguration<CompanyFeature>
{
    public override void Configure(EntityTypeBuilder<CompanyFeature> builder)
    {
        base.Configure(builder);
        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.CompanyFeatures)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
