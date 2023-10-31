using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Companies.Entities;

public class CompanyExternalServiceAccount : BaseEntity
{
    public int Id { get; set; }
    public Guid CompanyId { get; set; }
    public string ServiceName { get; set; } = "";
    public string AccessToken { get; set; } = "";
    public string RefreshToken { get; set; } = "";
    public Company Company { get; set; } = null!;
}
