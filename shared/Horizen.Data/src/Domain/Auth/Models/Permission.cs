using Horizen.Data.Domain.Auth.Enums;

namespace Horizen.Data.Domain.Auth.Models;

public class Permission
{
    public Resource Resource { get; set; }
    public UserActions Action { get; set; }
}
