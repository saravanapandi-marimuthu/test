using System.Text;
using System.Text.Json;
using Azure.Storage.Queues;
using Microsoft.Extensions.Logging;

namespace Horizen.Storage.Queues;

public abstract class BaseQueueService
{
    protected readonly ILogger _logger;
    private readonly string _connectionString;
    protected readonly QueueClient _queueClient;

    public BaseQueueService(ILogger logger, string connectionString, string queueName)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _connectionString =
            connectionString ?? throw new ArgumentNullException(nameof(connectionString));

        _queueClient = new QueueClient(_connectionString, queueName);

        _queueClient.CreateIfNotExists();
    }

    public Task SendMessageAsync<T>(T messageObj)
    {
        var jsonString = JsonSerializer.Serialize(messageObj);

        byte[] jsonBytes = Encoding.UTF8.GetBytes(jsonString);
        string message = Convert.ToBase64String(jsonBytes);

        return _queueClient.SendMessageAsync(message);
    }
}
