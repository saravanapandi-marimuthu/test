using Horizen.Data.Services.RelatedCompanies;
using Horizen.Data.Services.RelatedCompanies.Inputs;
using Horizen.Data.Services.Results;
using Horizen.Data.Domain.Auth.Enums;
using Horizen.Data.Domain.CompanyRelationships.Views;
using Horizen.WebApi.GraphQL.Attributes;
using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema.RelatedCompanies;

[QueryType]
public class RelatedCompanyQueries : BaseGraphQLQuery
{
    public RelatedCompanyQueries(ILogger<RelatedCompanyQueries> logger)
        : base(logger) { }

    [AuthorizeUser(Action = UserActions.Read, Resource = Resource.Company)]
    public async Task<CollectionResult<RelatedCompanyView>?> GetRelatedCompaniesAsync(
        [Service] RelatedCompanyService relatedCompanyService,
        IResolverContext context,
        GetRelatedCompaniesInput input
    )
    {
        var result = await relatedCompanyService.GetRelatedCompaniesAsync(input);

        if (result.IsFailure)
        {
            AddErrorToContext(context, ErrorCode.GetRelatedCompaniesError, result.ErrorMessage);
        }

        return result.Value;
    }
}

public class RelatedCompany { }
