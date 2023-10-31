using HotChocolate.Resolvers;

namespace Horizen.WebApi.GraphQL.Schema;

public abstract class BaseGraphQLMutation
{
    protected readonly ILogger _logger;

    public BaseGraphQLMutation(ILogger logger)
    {
        _logger = logger;
    }

    public void AddErrorToContext(
        IResolverContext context,
        ErrorCode errorCode,
        string? errorMessage
    )
    {
        string message = !string.IsNullOrWhiteSpace(errorMessage)
            ? errorMessage
            : ErrorDefinitions.GetErrorMessage(errorCode);

        var error = ErrorBuilder.New().SetMessage(message).SetCode(errorCode.ToString()).Build();

        context.ReportError(error);
    }
}
