using Horizen.Core.Attributes;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.UserRoles.Entities;

namespace Horizen.Data.Domain.Users.Entities;

public class User : BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [SkipInGraphQL]
    public string NormalizedEmail { get; set; } = "";
    public string Email { get; set; } = "";
    public string DisplayName { get; set; } = "";
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string? LastName { get; set; }
    public string? Notes { get; set; } = "";

    public Guid? SelectedUserRoleId { get; set; }

    public UserRole? SelectedUserRole { get; set; }

    public UserSettings? UserSettings { get; set; }

    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<UserAddress> UserAddresses { get; set; } = new List<UserAddress>();
    public ICollection<UserPhoneNumber> UserPhoneNumbers { get; set; } =
        new List<UserPhoneNumber>();

    public ICollection<UserTag> UserTags { get; set; } = new List<UserTag>();
}
