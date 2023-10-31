using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Domain.Auth.Views;

public class AuthenticatedUserView
{
    public string ExternalUserId { get; set; } = "";
    public UserView User { get; set; } = null!;
}

public class UserView
{
    public Guid Id { get; set; }
    public string Email { get; set; } = "";
    public IEnumerable<UserRoleView> UserRoles { get; set; } = new List<UserRoleView>();
    public Guid? SelectedUserRoleId { get; set; }
}

public class UserRoleView
{
    public Guid Id { get; set; }
    public RoleTypes RoleType { get; set; }
    public Guid CompanyId { get; set; }
}
