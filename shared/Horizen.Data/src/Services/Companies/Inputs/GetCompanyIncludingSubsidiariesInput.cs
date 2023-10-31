using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.Companies.Inputs;

public class GetCompanyWithSubsidiariesInput : PaginationInput
{
    public Guid CompanyId { get; set; }
}
