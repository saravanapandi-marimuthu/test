using Horizen.Data.Services.Configurations;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Data.Domain.Configurations.Entities;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.Configurations;

[MutationType]
public class PackageMutations : BaseGraphQLMutation
{
    public PackageMutations(ILogger<PackageMutations> logger)
        : base(logger) { }

    public async Task<Package> CreatePackageAsync(
        [Service] PackageService packageService,
        IResolverContext context,
        CreatePackageInput input
    )
    {
        var result = await packageService.CreatePackageAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.CreatePackageError, result.ErrorMessage);
        }

        if (result.Value is null)
        {
            _logger.LogError("Error creating package");

            var error = ErrorBuilder
                .New()
                .SetMessage("Error creating package")
                .SetCode("UNEXPECTED_ERROR")
                .Build();

            throw new GraphQLException(error);
        }
        return result.Value!;
    }
}
