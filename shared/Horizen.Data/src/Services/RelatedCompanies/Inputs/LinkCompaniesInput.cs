using Horizen.Data.Services.Inputs;
using Horizen.Data.Domain.CompanyRelationships.Enums;

namespace Horizen.Data.Services.RelatedCompanies.Inputs;

public class LinkCompaniesInput
{
    public Guid PrimaryCompanyId { get; set; }

    public Guid RelatedCompanyId { get; set; }

    public CompanyRelationshipType RelationshipType { get; set; }
    public string? Notes { get; set; }

    public ICollection<TagLinkInput> TagLinks { get; set; } = new List<TagLinkInput>();
}
