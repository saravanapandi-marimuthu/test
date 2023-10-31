namespace Horizen.Data.Services.Users.Inputs;

public class InviteUsersInput
{
    public ICollection<InviteUserInput> Users { get; set; } = new List<InviteUserInput>();
}
