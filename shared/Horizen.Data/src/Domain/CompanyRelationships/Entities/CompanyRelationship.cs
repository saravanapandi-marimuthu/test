using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.CompanyRelationships.Enums;
using Horizen.Data.Domain.CustomerDeliveryLocations.Entities;

namespace Horizen.Data.Domain.CompanyRelationships.Entities;

public class CompanyRelationship : BaseEntity
{
    public int Id { get; set; }
    public Guid PrimaryCompanyId { get; set; }
    public Guid RelatedCompanyId { get; set; }
    public CompanyRelationshipType CompanyRelationshipType { get; set; }
    public string? Notes { get; set; }
    public CompanyRelationshipStatus CompanyRelationshipStatus { get; set; }

    public Company PrimaryCompany { get; set; } = null!;
    public Company RelatedCompany { get; set; } = null!;
    public ICollection<CompanyRelationshipAttachment> Attachments { get; set; } =
        new List<CompanyRelationshipAttachment>();
    public ICollection<CompanyRelationshipTag> CompanyRelationshipTags { get; set; } =
        new List<CompanyRelationshipTag>();
    public ICollection<CustomerDeliveryLocation> CustomerDeliveryLocations { get; set; } =
        new List<CustomerDeliveryLocation>();
}
