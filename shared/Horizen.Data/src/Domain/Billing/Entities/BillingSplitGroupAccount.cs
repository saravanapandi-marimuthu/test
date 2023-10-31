using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;

namespace Horizen.Data.Domain.Billing.Entities;

public class BillingSplitGroupAccount : BaseEntity
{
    public int Id { get; set; }
    public Guid AccountCompanyId { get; set; } = Guid.Empty;
    public int SplitGroupId { get; set; }
    public Company AccountCompany { get; set; } = null!;

    public BillingSplitGroup SplitGroup { get; set; } = null!;
}
