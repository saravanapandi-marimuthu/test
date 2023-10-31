using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.Companies.Inputs;

public class GetManufacturerProductsInput : PaginationInput
{
    public Guid? ManufacturerCompanyId { get; set; }
}
