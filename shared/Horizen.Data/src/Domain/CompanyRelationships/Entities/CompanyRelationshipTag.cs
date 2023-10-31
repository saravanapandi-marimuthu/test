using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.CompanyRelationships.Entities;

public class CompanyRelationshipTag : BaseEntity
{
    public int CompanyRelationshipId { get; set; }
    public int TagId { get; set; }
    public CompanyRelationship CompanyRelationship { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
