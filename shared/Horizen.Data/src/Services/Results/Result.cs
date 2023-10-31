namespace Horizen.Data.Services.Results;

public class Result
{
    public bool IsSuccess { get; protected set; }
    public string ErrorMessage { get; protected set; }
    public ServiceErrorCode ErrorCode { get; }
    public bool IsFailure => !IsSuccess;

    protected Result(bool isSuccess, string errorMessage, ServiceErrorCode? errorCode = null)
    {
        if (isSuccess && !string.IsNullOrEmpty(errorMessage))
            throw new InvalidOperationException(
                "Cannot be a successful result with an error message."
            );
        if (!isSuccess && string.IsNullOrEmpty(errorMessage))
            throw new InvalidOperationException(
                "Cannot be a failed result without an error message."
            );

        IsSuccess = isSuccess;
        ErrorMessage = errorMessage;
        ErrorCode = isSuccess ? ServiceErrorCode.None : errorCode ?? ServiceErrorCode.Unknown;
    }

    public static Result Success() => new(true, string.Empty);

    public static Result Failure(
        string errorMessage,
        ServiceErrorCode? errorCode = ServiceErrorCode.Unknown
    ) => new(false, errorMessage, errorCode);
}

public class Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public ServiceErrorCode ErrorCode { get; }
    public string? ErrorMessage { get; }
    public bool IsFailure => !IsSuccess;

    private Result(
        T? value,
        bool isSuccess,
        string? errorMessage,
        ServiceErrorCode? errorCode = null
    )
    {
        if (isSuccess && !string.IsNullOrEmpty(errorMessage))
            throw new InvalidOperationException(
                "Cannot be a successful result with an error message."
            );
        if (!isSuccess && string.IsNullOrEmpty(errorMessage))
            throw new InvalidOperationException(
                "Cannot be a failed result without an error message."
            );

        IsSuccess = isSuccess;
        Value = value;
        ErrorMessage = errorMessage;
        ErrorCode = isSuccess ? ServiceErrorCode.None : errorCode ?? ServiceErrorCode.Unknown;
    }

    public static Result<T> Success(T? value) => new(value, true, null, ServiceErrorCode.None);

    public static Result<T> Failure(
        string errorMessage,
        ServiceErrorCode? errorCode = ServiceErrorCode.Unknown
    ) => new(default, false, errorMessage, errorCode);
}
