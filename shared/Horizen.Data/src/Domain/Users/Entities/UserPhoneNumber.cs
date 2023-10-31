using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Users.Entities;

public class UserPhoneNumber : PhoneNumberWithType
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public PhoneNumber PhoneNumber { get; set; } = null!;
}
