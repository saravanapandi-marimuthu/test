using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Companies.Entities;

public class CompanyAddress : AddressWithType
{
    public Guid CompanyId { get; set; }

    public Company Company { get; set; } = null!;
    public Address Address { get; set; } = null!;
}
