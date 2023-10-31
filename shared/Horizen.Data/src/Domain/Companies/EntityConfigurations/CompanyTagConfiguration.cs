using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Companies.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Companies.EntityConfigurations;

public class CompanyTagConfiguration : BaseModelConfiguration<CompanyTag>
{
    public override void Configure(EntityTypeBuilder<CompanyTag> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.CompanyId, e.TagId });

        builder
            .HasOne(e => e.Company)
            .WithMany(e => e.CompanyTags)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Tag)
            .WithMany()
            .HasForeignKey(e => e.TagId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
