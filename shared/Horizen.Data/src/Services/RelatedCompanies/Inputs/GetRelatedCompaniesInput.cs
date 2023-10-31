using Horizen.Data.Services.Inputs;
using Horizen.Data.Domain.CompanyRelationships.Enums;

namespace Horizen.Data.Services.RelatedCompanies.Inputs;

public class GetRelatedCompaniesInput : PaginationInput
{
    public Guid? CompanyId { get; set; }
    public string? CompanyName { get; set; } = null!;
    public CompanyRelationshipType? CompanyRelationshipType { get; set; }
}
