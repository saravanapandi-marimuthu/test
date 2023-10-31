using Horizen.Data.Domain.Auth.Enums;

namespace Horizen.Data.Domain.Auth.Models;

public static class RoleConfigurations
{
    public static List<Permission> GetSuperAdminPermissions()
    {
        return new List<Permission>
        {
            new() { Action = UserActions.All, Resource = Resource.All },
        };
    }

    public static List<Permission> GetCompanyAdminPermissions()
    {
        return new List<Permission>
        {
            new() { Action = UserActions.All, Resource = Resource.User },
            new() { Action = UserActions.All, Resource = Resource.Company },
            new() { Action = UserActions.All, Resource = Resource.Configuration },
            new() { Action = UserActions.All, Resource = Resource.Order },
            new() { Action = UserActions.All, Resource = Resource.Product },
            new() { Action = UserActions.All, Resource = Resource.Customer },
            new() { Action = UserActions.All, Resource = Resource.Warehouse },
            new() { Action = UserActions.All, Resource = Resource.Manufacturer },
            new() { Action = UserActions.All, Resource = Resource.Field },
        }
            .Concat(GetBasicUserPermissions())
            .ToList();
    }

    public static List<Permission> GetBasicUserPermissions()
    {
        return new List<Permission>
        {
            new() { Action = UserActions.All, Resource = Resource.UserProfile },
        };
    }

    public static List<Permission> GetSalesRepPermissions()
    {
        // This includes all BasicUser permissions plus some
        return new List<Permission>
        {
            new() { Action = UserActions.All, Resource = Resource.Product },
            new() { Action = UserActions.All, Resource = Resource.Customer }
        }
            .Concat(GetBasicUserPermissions())
            .ToList();
    }

    internal static List<Permission> GetSalesManagerPermissions()
    {
        return new List<Permission>
        {
            new() { Action = UserActions.All, Resource = Resource.User },
            new() { Action = UserActions.All, Resource = Resource.Company },
            new() { Action = UserActions.All, Resource = Resource.Configuration },
            new() { Action = UserActions.All, Resource = Resource.Order },
            new() { Action = UserActions.All, Resource = Resource.Product },
            new() { Action = UserActions.All, Resource = Resource.Customer },
            new() { Action = UserActions.All, Resource = Resource.Warehouse },
            new() { Action = UserActions.All, Resource = Resource.Manufacturer },
            new() { Action = UserActions.All, Resource = Resource.Field },
        }
            .Concat(GetBasicUserPermissions())
            .ToList();
    }
}
