using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Domain.Companies.Entities;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.Companies;

[MutationType]
public class CompanyMutations : BaseGraphQLMutation
{
    public CompanyMutations(ILogger<CompanyMutations> logger)
        : base(logger) { }

    public async Task<Company?> CreateCompanyAsync(
        [Service] CompanyService companyService,
        IResolverContext context,
        CreateCompanyInput input
    )
    {
        var result = await companyService.CreateCompanyAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.CreateCompanyError, result.ErrorMessage);
        }

        return result.Value;
    }
}
