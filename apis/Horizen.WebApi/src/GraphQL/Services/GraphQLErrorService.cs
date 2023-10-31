using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Services;

public class GraphQLErrorService
{
    // private readonly IResolverContext _context;

    public GraphQLErrorService()
    {
        //_context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public void AddErrorToContext(
        IResolverContext context,
        ErrorCode errorCode,
        string errorMessage
    )
    {
        string message = !string.IsNullOrWhiteSpace(errorMessage)
            ? errorMessage
            : ErrorDefinitions.GetErrorMessage(errorCode);

        context.ReportError(
            ErrorBuilder.New().SetCode(errorCode.ToString()).SetMessage(message).Build()
        );
    }
}
