using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.CompanyRelationships.EntityConfigurations;

public class CompanyRelationshipTagConfiguration : BaseModelConfiguration<CompanyRelationshipTag>
{
    public override void Configure(EntityTypeBuilder<CompanyRelationshipTag> builder)
    {
        base.Configure(builder);
        builder.HasKey(x => new { x.CompanyRelationshipId, x.TagId });

        builder
            .HasOne(e => e.CompanyRelationship)
            .WithMany(e => e.CompanyRelationshipTags)
            .HasForeignKey(e => e.CompanyRelationshipId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
