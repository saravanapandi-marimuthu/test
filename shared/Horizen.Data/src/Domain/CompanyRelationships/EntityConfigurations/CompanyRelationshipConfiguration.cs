using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.CompanyRelationships.EntityConfigurations;

public class CompanyRelationshipConfiguration : BaseModelConfiguration<CompanyRelationship>
{
    public override void Configure(EntityTypeBuilder<CompanyRelationship> builder)
    {
        base.Configure(builder);
        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.PrimaryCompany)
            .WithMany(e => e.FirstCompanyRelationships)
            .HasForeignKey(e => e.PrimaryCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.RelatedCompany)
            .WithMany(e => e.SecondCompanyRelationships)
            .HasForeignKey(e => e.RelatedCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.Attachments)
            .WithOne(e => e.CompanyRelationship)
            .HasForeignKey(e => e.CompanyRelationshipId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CompanyRelationshipTags)
            .WithOne(e => e.CompanyRelationship)
            .HasForeignKey(e => e.CompanyRelationshipId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CustomerDeliveryLocations)
            .WithOne(e => e.Customer)
            .HasForeignKey(e => e.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
