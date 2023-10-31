using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Common.Enums;

namespace Horizen.Data.Domain.Companies.Entities;

public class CompanyFeature : BaseEntity
{
    public int Id { get; set; }
    public Guid CompanyId { get; set; }
    public SaaSFeature Feature { get; set; }
    public Company Company { get; set; } = null!;
}
