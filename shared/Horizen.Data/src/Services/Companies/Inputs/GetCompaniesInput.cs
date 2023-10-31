using Horizen.Data.Services.Inputs;
using Horizen.Data.Domain.Companies.Enums;

namespace Horizen.Data.Services.Companies.Inputs;

public class GetCompaniesInput : PaginationInput
{
    public ICollection<CompanyServiceTypes>? ServiceTypes { get; set; } = null;
}
