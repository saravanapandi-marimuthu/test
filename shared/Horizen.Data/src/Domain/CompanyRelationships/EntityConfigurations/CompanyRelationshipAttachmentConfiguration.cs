using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.CompanyRelationships.EntityConfigurations;

public class CompanyRelationshipAttachmentConfiguration
    : BaseModelConfiguration<CompanyRelationshipAttachment>
{
    public override void Configure(EntityTypeBuilder<CompanyRelationshipAttachment> builder)
    {
        base.Configure(builder);
        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.CompanyRelationship)
            .WithMany(e => e.Attachments)
            .HasForeignKey(e => e.CompanyRelationshipId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
