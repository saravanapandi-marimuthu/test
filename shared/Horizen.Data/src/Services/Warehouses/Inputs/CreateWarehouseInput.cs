using Horizen.Data.Services.Inputs;
using Horizen.Data.Domain.Warehouses.Entities;

namespace Horizen.Data.Services.Warehouses.Inputs;

public class CreateWarehouseInput
{
    public Guid RetailerCompanyId { get; set; }
    public string Name { get; set; } = "";
    public string? Notes { get; set; }

    public ICollection<CreateAddressWithTypeInput> Addresses { get; set; } =
        new List<CreateAddressWithTypeInput>();

    public ICollection<CreatePhoneNumberWithTypeInput> PhoneNumbers { get; set; } =
        new List<CreatePhoneNumberWithTypeInput>();

    public Warehouse ToWarehouse()
    {
        return new Warehouse
        {
            RetailerCompanyId = RetailerCompanyId,
            Name = Name,
            Notes = Notes,
            CreatedBy = "System",
        };
    }
}
