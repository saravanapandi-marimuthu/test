using Horizen.Data.Services.Users;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Users.Entities;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[QueryType]
public class LoggedInUserQueries : BaseGraphQLQuery
{
    public LoggedInUserQueries(ILogger<LoggedInUserQueries> logger)
        : base(logger) { }

    [AuthorizeUser(
        Action = UserActions.Read,
        Resource = Resource.UserProfile,
        AllowForAllRoles = true
    )]
    public async Task<User?> GetUserInfoAsync(
        [Service] LoggedInUserService loggedInUserService,
        [Service] IAuthenticatedUserService authenticatedUserService,
        IResolverContext context
    )
    {
        var userId = authenticatedUserService.AuthenticatedUser?.User.Id ?? Guid.Empty;

        if (userId == Guid.Empty)
        {
            AddErrorToContext(context, ErrorCode.GetUserInfoError, "User not found");
            return null;
        }

        var result = await loggedInUserService.GetUserAsync(userId);

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

    public User? GetTestUser(IResolverContext context)
    {
        AddErrorToContext(context, ErrorCode.GetUserInfoError, "This is a test error");

        return null;
    }
}
