namespace Horizen.GraphQL.Errors;

public class UnknownException : Exception
{
    public UnknownException(string message)
        : base(message) { }
}
