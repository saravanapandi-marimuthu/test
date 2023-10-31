using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.Inputs;
using Horizen.Data.Domain.CompanyRelationships.Enums;

namespace Horizen.Data.Services.RelatedCompanies.Inputs;

public class CreateRelatedCompanyInput
{
    public Guid? RelatedCompanyId { get; set; }
    public string? RelatedCompanyName { get; set; } = null!;

    public CreateCompanyInput Company { get; set; } = null!;
    public CompanyRelationshipType RelationshipType { get; set; }
    public string? Notes { get; set; }
    public ICollection<TagLinkInput> TagLinks { get; set; } = new List<TagLinkInput>();
}
