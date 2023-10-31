using System.Reflection;
using System.Runtime.CompilerServices;
using Horizen.Data.Services.Users;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.Auth.Models;
using Horizen.Data.Domain.Auth.Services;
using HotChocolate.Resolvers;
using HotChocolate.Types.Descriptors;

namespace Horizen.WebApi.GraphQL.Attributes;

public class AuthorizeUserAttribute : ObjectFieldDescriptorAttribute
{
    public AuthorizeUserAttribute([CallerLineNumber] int order = 0)
    {
        Order = order;
    }

    public Resource Resource { get; set; } = Resource.None;
    public UserActions Action { get; set; } = UserActions.Read;

    public List<Permission> Permissions { get; set; } = new List<Permission>();
    public bool AllowForAllRoles { get; set; } = false;

    protected override void OnConfigure(
        IDescriptorContext context,
        IObjectFieldDescriptor descriptor,
        MemberInfo member
    )
    {
        descriptor.Use(next => AuthorizeUser(next));
    }

    private FieldDelegate AuthorizeUser(FieldDelegate next)
    {
        return async context =>
        {
            //var someInput = context.ArgumentOptional<string>("input");
            var authenticatedUserService =
                context.Services.GetRequiredService<IAuthenticatedUserService>();

            var user = authenticatedUserService.AuthenticatedUser?.User;
            var selectedRoleId = authenticatedUserService.SelectedUserRoleId ?? Guid.Empty;

            if (user == null)
            {
                var error = ErrorBuilder
                    .New()
                    .SetMessage("Access denied.")
                    .SetPath(context.Path)
                    .SetCode("UNAUTHENTICATED")
                    .Build();

                throw new GraphQLException(error);
            }

            if (AllowForAllRoles)
            {
                await next(context);
                return;
            }

            if (selectedRoleId == Guid.Empty)
            {
                var error = ErrorBuilder
                    .New()
                    .SetMessage("Access denied.")
                    .SetPath(context.Path)
                    .SetCode("UNAUTHORIZED")
                    .Build();

                throw new GraphQLException(error);
            }

            var selectedRoleType = user.UserRoles
                .FirstOrDefault(x => x.Id == selectedRoleId)
                ?.RoleType;

            if (selectedRoleType == null)
            {
                var error = ErrorBuilder
                    .New()
                    .SetMessage("Access denied.")
                    .SetPath(context.Path)
                    .SetCode("UNAUTHORIZED")
                    .Build();

                throw new GraphQLException(error);
            }

            var userService =
                context.Services.GetRequiredService<UserService>()
                ?? throw new GraphQLException("Unknown exception.");

            Console.WriteLine($"UseMyMiddleware {Resource} {Action}");

            if (
                PermissionRegistry.RolePermissions.TryGetValue(
                    selectedRoleType.Value,
                    out var permissions
                )
            )
            {
                if (!permissions.Any(p => p.Action.HasFlag(Action) && p.Resource.HasFlag(Resource)))
                {
                    var error = ErrorBuilder
                        .New()
                        .SetMessage("Access denied.")
                        .SetPath(context.Path)
                        .SetCode("UNAUTHORIZED")
                        .Build();

                    throw new GraphQLException(error);
                }
            }

            await next(context);
        };
    }
}
