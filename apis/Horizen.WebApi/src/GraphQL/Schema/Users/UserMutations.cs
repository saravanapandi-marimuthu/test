using Horizen.Data.Services.Results;
using Horizen.Data.Services.Users;
using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.Users.Entities;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[MutationType]
public class UserMutations : BaseGraphQLMutation
{
    public UserMutations(ILogger<UserMutations> logger)
        : base(logger) { }

    [GraphQLDescription("Invite a new user")]
    [AuthorizeUser(Action = UserActions.Create, Resource = Resource.User)]
    public async Task<CollectionResult<UserInvite>?> InviteUserAsync(
        [Service] UserService userService,
        IResolverContext context,
        InviteUsersInput input
    )
    {
        var result = await userService.InviteUsersAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.InviteUsersError, result.ErrorMessage);
        }

        return result.Value;
    }
}
