using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Services.Users;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;
using Horizen.Data.Domain.Users.Entities;
using Horizen.Data.Domain.Auth.Enums;

namespace Horizen.WebApi.GraphQL.Schema.LoggedInUser;

[MutationType]
public class LoggedInUserMutations : BaseGraphQLMutation
{
    public LoggedInUserMutations(ILogger<LoggedInUserMutations> logger)
        : base(logger) { }

    public async Task<User> CreateUserAddressAsync(
        [Service] LoggedInUserService loggedInUserService,
        CreateUserAddressInput input
    )
    {
        var result = await loggedInUserService.CreateUserAddressAsync(input);

        if (result.IsFailure)
        {
            var error = ErrorBuilder
                .New()
                .SetMessage(result.ErrorMessage ?? "Error creating user address")
                .SetCode("CREATE_ADDRESS_ERROR")
                .Build();

            throw new GraphQLException(error);
        }

        if (result.Value is null)
        {
            _logger.LogError("Error creating user address");

            var error = ErrorBuilder
                .New()
                .SetMessage("Error creating user address")
                .SetCode("UNEXPECTED_ERROR")
                .Build();

            throw new GraphQLException(error);
        }

        return result.Value!;
    }

    public async Task<User> UpdateUserAddressAsync(
        [Service] LoggedInUserService loggedInUserService,
        UpdateUserAddressInput input
    )
    {
        var result = await loggedInUserService.UpdateUserAddressAsync(input);

        if (result.IsFailure)
        {
            var error = ErrorBuilder
                .New()
                .SetMessage(result.ErrorMessage ?? "Error updating user address")
                .SetCode("UPDATE_ADDRESS_ERROR")
                .Build();

            throw new GraphQLException(error);
        }

        if (result.Value is null)
        {
            _logger.LogError("Error updating user address");

            var error = ErrorBuilder
                .New()
                .SetMessage("Error updating user address")
                .SetCode("UNEXPECTED_ERROR")
                .Build();

            throw new GraphQLException(error);
        }

        return result.Value!;
    }

    public async Task<User> DeleteUserAddressAsync(
        [Service] LoggedInUserService loggedInUserService,
        DeleteUserAddressInput input
    )
    {
        var result = await loggedInUserService.DeleteUserAddressAsync(input);

        if (result.IsFailure)
        {
            var error = ErrorBuilder
                .New()
                .SetMessage(result.ErrorMessage ?? "Error deleting user address")
                .SetCode("DELETE_ADDRESS_ERROR")
                .Build();

            throw new GraphQLException(error);
        }

        if (result.Value is null)
        {
            _logger.LogError("Error deleting user address");

            var error = ErrorBuilder
                .New()
                .SetMessage("Error deleting user address")
                .SetCode("UNEXPECTED_ERROR")
                .Build();

            throw new GraphQLException(error);
        }

        return result.Value!;
    }

    [AuthorizeUser(
        Action = UserActions.Read,
        Resource = Resource.UserProfile,
        AllowForAllRoles = true
    )]
    public async Task<User?> SwitchUserRoleAsync(
        [Service] LoggedInUserService loggedInUserService,
        IResolverContext context,
        SwitchUserRoleInput input
    )
    {
        var result = await loggedInUserService.SwitchUserRoleAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetUserInfoError, result.ErrorMessage);
        }

        if (result.Value is null)
        {
            AddErrorToContext(context, ErrorCode.GetUserInfoError, result.ErrorMessage);
        }

        return result.Value;
    }
}
