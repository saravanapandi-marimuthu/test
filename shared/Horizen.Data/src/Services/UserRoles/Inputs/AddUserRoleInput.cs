using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Services.UserRoles.Inputs;

public class AddUserRoleInput
{
    public Guid UserId { get; set; }
    public Guid CompanyId { get; set; }
    public ICollection<RoleTypes> RoleTypes { get; set; } = new List<RoleTypes>();
    public bool? SetAsSelectedRole { get; set; } = false;
}
