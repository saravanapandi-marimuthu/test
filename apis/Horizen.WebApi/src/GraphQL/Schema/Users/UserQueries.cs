using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Users;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.Users.Entities;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[QueryType]
public class UserQueries : BaseGraphQLQuery
{
    public UserQueries(ILogger<UserQueries> logger)
        : base(logger) { }

    [GraphQLDescription("Get all users")]
    [AuthorizeUser(Action = UserActions.GodMode, Resource = Resource.User)]
    public async Task<CollectionResult<User>?> GetUsersAsync(
        [Service] UserService userService,
        IResolverContext context,
        GetUsersInput input
    )
    {
        var result = await userService.GetUsersAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetUsersError, result.ErrorMessage);
        }

        return result.Value;
    }

    [GraphQLDescription("Get a user by id or email")]
    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.User)]
    public async Task<User?> GetUserAsync(
        [Service] UserService userService,
        IResolverContext context,
        GetUserInput input
    )
    {
        var result = await userService.GetUserAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetUserError, result.ErrorMessage);
        }

        return result.Value;
    }
}
