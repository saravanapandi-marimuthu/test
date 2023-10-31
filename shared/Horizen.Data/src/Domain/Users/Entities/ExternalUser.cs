using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Users.Entities;

public class ExternalUser : BaseEntity
{
    public int Id { get; set; }
    public string ExternalUserId { get; set; } = "";
    public string Provider { get; set; } = "";
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}
