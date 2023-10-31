using Azure;
using Azure.Data.Tables;
using Horizen.Storage.Utility;
using Microsoft.Extensions.Logging;

namespace Horizen.Storage.Tables;

public class UrlTableService : BaseTableService, ITableService
{
    private static readonly string _partitionKey = "URLs";

    public UrlTableService(ILogger<UrlTableService> logger, string connectionString)
        : base(logger, connectionString) { }

    public Task AddUrlToDownloadAsync(string url, string? parentUrl)
    {
        var entity = new UrlEntity
        {
            PartitionKey = _partitionKey,
            RowKey = GenerateRowKey(url),
            Url = url,
            AttemptCount = 0,
            ParentUrl = parentUrl,
            Status = "Pending",
        };

        return _tableClient.AddEntityAsync(entity);
    }

    public async Task<UrlEntity?> GetUrlToDownloadAsync()
    {
        string filter = $"(Status eq 'Pending') and (AttemptCount lt 3)";

        await foreach (var entity in _tableClient.QueryAsync<UrlEntity>(filter))
        {
            entity.Status = "In Process";

            try
            {
                // Use the ETag to achieve optimistic concurrency
                await _tableClient.UpdateEntityAsync(entity, entity.ETag);
                return entity;
            }
            catch (RequestFailedException ex) when (ex.Status == 412) // 412 is Precondition Failed
            {
                // Another client updated the entity in the meantime
                // You can log this event and continue the loop to fetch the next entity
                _logger.LogWarning(
                    $"{nameof(GetUrlToDownloadAsync)} ETag mismatch for entity {entity.RowKey}"
                );
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(
                    ex,
                    $"{nameof(GetUrlToDownloadAsync)} Error updating entity {entity.RowKey}"
                );
            }
        }
        return null; // Return null if no suitable URL is found
    }

    public async Task UpdateUrlAfterAttemptAsync(
        string rowKey,
        bool downloadSucceeded,
        int totalLinksFound = 0
    )
    {
        // 1. Retrieve the Entity
        var entity = await _tableClient.GetEntityAsync<UrlEntity>(_partitionKey, rowKey);

        if (entity != null)
        {
            // 2. Modify the Entity based on the outcome
            if (downloadSucceeded)
            {
                entity.Value.Status = "Complete";
                entity.Value.TotalLinksFound = totalLinksFound;
            }
            else
            {
                entity.Value.AttemptCount++;

                if (entity.Value.AttemptCount >= 3)
                {
                    entity.Value.Status = "Failed";
                }
            }

            // 3. Update the Entity
            await _tableClient.UpdateEntityAsync(entity.Value, ETag.All);
        }
    }

    private string GenerateRowKey(string url)
    {
        string hashedUrl = HashUtility.ComputeSha256Hash(url);
        string timestamp = $"{DateTime.MaxValue.Ticks - DateTime.UtcNow.Ticks:D19}";
        return $"{timestamp}_{hashedUrl}";
    }
}
