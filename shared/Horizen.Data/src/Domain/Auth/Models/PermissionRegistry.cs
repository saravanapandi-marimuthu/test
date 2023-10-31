using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Domain.Auth.Models;

public static class PermissionRegistry
{
    public static Dictionary<RoleTypes, List<Permission>> RolePermissions =
        new()
        {
            [RoleTypes.BasicUser] = RoleConfigurations.GetBasicUserPermissions(),
            [RoleTypes.SalesRep] = RoleConfigurations.GetSalesRepPermissions(),
            [RoleTypes.CompanyAdmin] = RoleConfigurations.GetCompanyAdminPermissions(),
            [RoleTypes.SuperAdmin] = RoleConfigurations.GetSuperAdminPermissions(),
            [RoleTypes.SalesManager] = RoleConfigurations.GetSalesManagerPermissions(),
        };

    public static List<Permission> GetPermissionsForRoles(
        RoleTypes roles,
        List<Permission> overriddenPermissions
    )
    {
        var defaultPermissions = GetAllPermissionsForRoles(roles);

        foreach (var overridePerm in overriddenPermissions)
        {
            var defaultPerm = defaultPermissions.FirstOrDefault(
                p => p.Resource == overridePerm.Resource
            );

            if (defaultPerm == null)
            {
                // If the resource doesn't exist in default permissions, add it
                defaultPermissions.Add(overridePerm);
                continue;
            }

            // Merge permissions with the given bitwise logic
            defaultPerm.Action = (defaultPerm.Action | overridePerm.Action) & overridePerm.Action;
        }

        if (defaultPermissions.Any(p => p.Action == UserActions.All && p.Resource == Resource.All))
        {
            return new List<Permission>
            {
                new() { Action = UserActions.All, Resource = Resource.All }
            };
        }

        return defaultPermissions.Where(p => p.Action != UserActions.None).ToList();
    }

    private static List<Permission> GetAllPermissionsForRoles(RoleTypes roles)
    {
        // Extract individual roles from the flag
        var individualRoles = Enum.GetValues(typeof(RoleTypes))
            .Cast<RoleTypes>()
            .Where(role => roles.HasFlag(role) && role != RoleTypes.Unassigned)
            .ToList();

        // Get all permissions associated with these roles
        var permissions = individualRoles
            .Where(RolePermissions.ContainsKey)
            .SelectMany(role => RolePermissions[role])
            .ToList();

        // Combine and aggregate permissions
        var aggregatedPermissions = permissions
            .GroupBy(p => p.Resource)
            .Select(
                g =>
                    new Permission
                    {
                        Resource = g.Key,
                        Action = g.Aggregate(
                            UserActions.None,
                            (current, permission) => current | permission.Action
                        )
                    }
            )
            .ToList();

        return aggregatedPermissions;
    }
}
