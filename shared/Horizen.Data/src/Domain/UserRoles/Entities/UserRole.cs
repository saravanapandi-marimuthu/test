using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Core.Attributes;
using Horizen.Data.Domain.Users.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Auth.Models;
using Horizen.Data.Domain.UserRoles.Enums;
using Horizen.Core.Utilities;
using Horizen.Core.Models;

namespace Horizen.Data.Domain.UserRoles.Entities;

public class UserRole : BaseEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid CompanyId { get; set; }

    [SkipInGraphQL]
    public RoleTypes RoleType { get; set; }
    public string? AclOverrides { get; set; }
    public string? Notes { get; set; }
    public User? User { get; set; }
    public Company? Company { get; set; }

    [NotMapped]
    public IEnumerable<RoleTypes> Roles
    {
        get
        {
            return Enum.GetValues(typeof(RoleTypes))
                .Cast<RoleTypes>()
                .Where(r => (RoleType & r) == r && r != RoleTypes.Unassigned);
        }
        set
        {
            if (value == null)
            {
                RoleType = RoleTypes.Contact;
                return;
            }

            RoleTypes combinedRole = RoleTypes.Contact;

            foreach (var role in value)
            {
                combinedRole |= role;
            }

            RoleType = combinedRole;
        }
    }

    [NotMapped]
    public List<EnumInfo<RoleTypes>> RolesInfo
    {
        get => EnumUtility.GetFlagsInfo(RoleType, RoleTypes.Unassigned);
    }

    [NotMapped]
    public List<Permission> RolePermissions =>
        PermissionRegistry.GetPermissionsForRoles(RoleType, new List<Permission>());
}
