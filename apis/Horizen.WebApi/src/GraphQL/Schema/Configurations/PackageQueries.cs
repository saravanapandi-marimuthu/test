using Horizen.Data.Services.Configurations;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Data.Domain.Configurations.Entities;
using HotChocolate.Resolvers;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Services.Results;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[QueryType]
public class PackageQueries : BaseGraphQLQuery
{
    public PackageQueries(ILogger<PackageQueries> logger)
        : base(logger) { }

    public async Task<Package?> GetPackageAsync(
        [Service] PackageService packageService,
        GetPackageInput input,
        [Service] IAuthenticatedUserService authenticatedUserService,
        IResolverContext context
    )
    {
        var result = await packageService.GetPackageAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetPackageError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }

    public async Task<CollectionResult<Package>?> GetPackagesAsync(
        [Service] PackageService packageService,
        GetPackagesInput input,
        [Service] IAuthenticatedUserService authenticatedUserService,
        IResolverContext context
    )
    {
        Console.WriteLine($"User: {authenticatedUserService.AuthenticatedUser?.User.Email}");
        var result = await packageService.GetPackagesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetPackageError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }
}
