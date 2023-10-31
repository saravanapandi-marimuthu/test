using Horizen.Data.Models.UserRoles;
using FluentAssertions;

namespace Horizen.Data.Models.Authorization.Tests;

public class PermissionRegistryTests
{
    [Fact]
    public void PermissionsForSelectedRoleShouldMatch()
    {
        // Arrange
        var selectedRole = RoleType.BasicUser | RoleType.SalesRep;

        var selectedRolePermissions = new List<Permission>
        {
            new() { Action = UserAction.Read, Resource = Resource.UserProfile },
            new() { Action = UserAction.All, Resource = Resource.Product },
            new() { Action = UserAction.All, Resource = Resource.Customer },
        };

        // Act
        var permissions = PermissionRegistry.GetPermissionsForRoles(
            selectedRole,
            new List<Permission>()
        );

        // Assert
        selectedRolePermissions.Should().BeEquivalentTo(permissions);
    }

    [Fact]
    public void PermissionsShouldIncludeOverridesWithIncreasedAccess()
    {
        // Arrange
        var selectedRole = RoleType.BasicUser | RoleType.SalesRep;

        var selectedRolePermissions = new List<Permission>
        {
            new() { Action = UserAction.Read, Resource = Resource.UserProfile },
            new() { Action = UserAction.All, Resource = Resource.Product },
            new() { Action = UserAction.All, Resource = Resource.Customer },
            new() { Action = UserAction.Read, Resource = Resource.Company },
        };

        var overrides = new List<Permission>
        {
            new() { Action = UserAction.Read, Resource = Resource.Company },
        };

        // Act
        var permissions = PermissionRegistry.GetPermissionsForRoles(selectedRole, overrides);

        // Assert
        selectedRolePermissions.Should().BeEquivalentTo(permissions);
    }

    [Fact]
    public void PermissionsShouldIncludeOverridesWithDecreasedAccess()
    {
        // Arrange
        var selectedRole = RoleType.BasicUser | RoleType.SalesRep;

        var selectedRolePermissions = new List<Permission>
        {
            new() { Action = UserAction.Read, Resource = Resource.UserProfile },
            new() { Action = UserAction.All, Resource = Resource.Product },
            new() { Action = UserAction.Read, Resource = Resource.Company },
            new() { Action = UserAction.Read, Resource = Resource.Customer },
        };

        var overrides = new List<Permission>
        {
            new() { Action = UserAction.Read, Resource = Resource.Company },
            new() { Action = UserAction.Read, Resource = Resource.Customer },
        };

        // Act
        var permissions = PermissionRegistry.GetPermissionsForRoles(selectedRole, overrides);

        // Assert
        selectedRolePermissions.Should().BeEquivalentTo(permissions);
    }
}
