using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.Companies.Entities;

public class CompanyTag : BaseEntity
{
    public Guid CompanyId { get; set; }
    public int TagId { get; set; }
    public Company Company { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
