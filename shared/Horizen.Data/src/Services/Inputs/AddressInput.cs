// Input class to capture address information

using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Common.Enums;

namespace Horizen.Data.Services.Inputs;

public class CreateAddressWithTypeInput
{
    public AddressType AddressType { get; set; } = AddressType.Billing;

    public CreateAddressInput Address { get; set; } = new CreateAddressInput();
}

public class CreateAddressInput
{
    public string AddressLine1 { get; set; } = "";
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public string PostalCode { get; set; } = "";
    public string Country { get; set; } = "";

    public Address ToAddress()
    {
        return new Address
        {
            AddressLine1 = AddressLine1,
            AddressLine2 = AddressLine2,
            City = City,
            State = State,
            PostalCode = PostalCode,
            Country = Country
        };
    }
}

public class UpdateAddressWithTypeInput
{
    public int AddressId { get; set; }
    public AddressType AddressType { get; set; } = AddressType.Billing;

    public UpdateAddressInput Address { get; set; } = new UpdateAddressInput();
}

public class UpdateAddressInput : CreateAddressInput
{
    public int Id { get; set; }
}
