using Azure.Data.Tables;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Horizen.Storage.Utility;

namespace Horizen.Storage.Tables;

public abstract class BaseTableService
{
    protected readonly ILogger _logger;
    private readonly string _connectionString;
    protected readonly TableClient _tableClient;

    private readonly string _tableName = "DownloaderQueue";

    public BaseTableService(ILogger logger, string connectionString)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        _connectionString =
            connectionString ?? throw new ArgumentNullException(nameof(_connectionString));

        _tableClient = new TableClient(_connectionString, _tableName);

        _tableClient.CreateIfNotExists();
    }
}
