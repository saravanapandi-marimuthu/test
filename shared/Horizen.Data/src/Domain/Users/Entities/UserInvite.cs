using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Domain.Users.Entities;

public class UserInvite : BaseEntity
{
    public int Id { get; set; }
    public string NormalizedEmail { get; set; } = "";
    public string Email { get; set; } = "";
    public Guid CompanyId { get; set; }
    public int RoleId { get; set; }
    public string Token { get; set; } = "";
    public DateTime ExpiresAt { get; set; }
    public DateTime? RedeemedAt { get; set; }
    public DateTime? ResentAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public string? RevokedBy { get; set; }
    public string? RevokedReason { get; set; }
    public Company Company { get; set; } = null!;
    public RoleTypes Role { get; set; } = RoleTypes.BasicUser;

    [NotMapped]
    public bool IsExpired => ExpiresAt < DateTime.UtcNow;

    [NotMapped]
    public bool IsRedeemed => RedeemedAt.HasValue;

    [NotMapped]
    public bool IsRevoked => RevokedAt.HasValue;
}
