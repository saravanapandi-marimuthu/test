using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.Users.Entities;

public class UserTag : BaseEntity
{
    public Guid UserId { get; set; }
    public int TagId { get; set; }
    public User User { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
