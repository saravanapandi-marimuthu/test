using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Services.UserRoles.Inputs;

public class RemoveUserRoleInput
{
    public Guid UserId { get; set; }
    public Guid CompanyId { get; set; }
    public RoleTypes RoleType { get; set; }
}
