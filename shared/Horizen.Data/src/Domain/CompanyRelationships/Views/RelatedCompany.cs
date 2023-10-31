using Horizen.Core.Extensions;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using Horizen.Data.Domain.CompanyRelationships.Enums;

namespace Horizen.Data.Domain.CompanyRelationships.Views;

public class RelatedCompanyView
{
    public Company Company { get; set; } = null!;
    public CompanyRelationshipType CompanyRelationshipType { get; set; }

    public CompanyRelationshipDirection CompanyRelationshipDirection { get; set; } =
        CompanyRelationshipDirection.PrimaryToRelated;

    public ICollection<CompanyRelationshipTag> CompanyRelationshipTags { get; set; } =
        new List<CompanyRelationshipTag>();
    public string CompanyRelationshipTypeName => CompanyRelationshipType.GetEnumName() ?? "Unknown";
}
