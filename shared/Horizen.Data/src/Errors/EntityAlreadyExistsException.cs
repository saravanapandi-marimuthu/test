namespace Horizen.Data.Errors;

public class EntityAlreadyExistsException : Exception
{
    public EntityAlreadyExistsException(string message)
        : base(message) { }
}
