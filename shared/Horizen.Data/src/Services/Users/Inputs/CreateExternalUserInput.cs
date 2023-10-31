namespace Horizen.Data.Services.Users.Inputs;

public class CreateExternalUserInput : CreateUserInput
{
    public string ExternalUserId { get; set; } = "";
    public string Provider { get; set; } = "";
}
