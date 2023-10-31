using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Companies.Entities;

public class CompanyPhoneNumber : PhoneNumberWithType
{
    public Guid CompanyId { get; set; }
    public Company Company { get; set; } = null!;
    public PhoneNumber PhoneNumber { get; set; } = null!;
}
