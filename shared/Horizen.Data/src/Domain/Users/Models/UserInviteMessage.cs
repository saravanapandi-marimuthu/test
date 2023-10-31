using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Domain.Users.Models;

public class UserInviteMessage
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public RoleTypes Role { get; set; } = RoleTypes.BasicUser;
    public Guid CompanyId { get; set; } = Guid.Empty;
    public DateTime ExpiresAt { get; set; }
    public string Token { get; set; } = string.Empty;
    public Guid InvitedByUserId { get; set; } = Guid.Empty;
}
