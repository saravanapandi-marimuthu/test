using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.Results;
using Horizen.Data.Domain.Companies.Entities;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.Companies;

[QueryType]
public class CompanyQueries : BaseGraphQLQuery
{
    public CompanyQueries(ILogger<CompanyQueries> logger)
        : base(logger) { }

    //[AuthorizeUser(Action = UserAction.Read, Resource = Resource.Configuration)]
    public async Task<Company?> GetCompanyAsync(
        [Service] CompanyService companyService,
        GetCompanyInput input,
        IResolverContext context
    )
    {
        var result = await companyService.GetCompanyAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetCompanyError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }

    //[AuthorizeUser(Action = UserAction.Read, Resource = Resource.Company)]
    public async Task<CollectionResult<Company>?> GetCompaniesAsync(
        [Service] CompanyService companyService,
        GetCompaniesInput input,
        IResolverContext context
    )
    {
        var result = await companyService.GetCompaniesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetCompanyError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }

    public async Task<CollectionResult<Company>?> GetCompanyWithSubsidiariesAsync(
        [Service] CompanyService companyService,
        GetCompanyWithSubsidiariesInput input,
        IResolverContext context
    )
    {
        var result = await companyService.GetCompanyWithSubsidiariesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetCompanyError, result.ErrorMessage);

            return null;
        }

        return result.Value;
    }
}
