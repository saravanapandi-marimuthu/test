using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.Users.Inputs;

public class CreateUserPhoneNumberInput : CreatePhoneNumberWithTypeInput
{
    public Guid UserId { get; set; }
}

public class UpdateUserPhoneNumberInput : UpdatePhoneNumberWithTypeInput
{
    public Guid UserId { get; set; }
}

public class DeleteUserPhoneNumberInput
{
    public Guid UserId { get; set; }
    public int PhoneNumberId { get; set; }
}
