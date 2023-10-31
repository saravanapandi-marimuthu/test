using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.Users.Inputs;

public class UpdateUserAddressInput : UpdateAddressWithTypeInput
{
    public Guid UserId { get; set; }
}

public class CreateUserAddressInput : CreateAddressWithTypeInput
{
    public Guid UserId { get; set; }
}

public class DeleteUserAddressInput
{
    public Guid UserId { get; set; }
    public int AddressId { get; set; }
}
