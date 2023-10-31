using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Services.Users.Inputs;

public class InviteUserInput
{
    public Guid CompanyId { get; set; }
    public string Email { get; set; } = null!;
    public RoleTypes Role { get; set; }
}
