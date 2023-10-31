using Horizen.Data.Services.RelatedCompanies;
using Horizen.Data.Services.RelatedCompanies.Inputs;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.RelatedCompanies;

[MutationType]
public class RelatedCompanyMutations : BaseGraphQLMutation
{
    public RelatedCompanyMutations(ILogger<RelatedCompanyMutations> logger)
        : base(logger) { }

    //[AuthorizeUser(Action = UserAction.Read, Resource = Resource.Company)]
    public async Task<CompanyRelationship?> CreateRelatedCompanyAsync(
        [Service] RelatedCompanyService relatedCompanyService,
        IResolverContext context,
        CreateRelatedCompanyInput input
    )
    {
        var result = await relatedCompanyService.CreateRelatedCompanyAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.CreateRelatedCompanyError, result.ErrorMessage);
        }

        return result.Value;
    }

    public async Task<CompanyRelationship?> LinkCompaniesAsync(
        [Service] RelatedCompanyService relatedCompanyService,
        IResolverContext context,
        LinkCompaniesInput input
    )
    {
        var result = await relatedCompanyService.LinkCompaniesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.LinkCompaniesError, result.ErrorMessage);
        }

        return result.Value;
    }
}
