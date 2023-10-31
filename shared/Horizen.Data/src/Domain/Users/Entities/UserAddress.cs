using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Users.Entities;

public class UserAddress : AddressWithType
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Address Address { get; set; } = null!;
}
