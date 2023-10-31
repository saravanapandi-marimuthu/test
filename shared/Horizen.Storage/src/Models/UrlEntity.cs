using Azure;
using Azure.Data.Tables;

public class UrlEntity : ITableEntity
{
    public string Url { get; set; } = string.Empty;
    public int AttemptCount { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? ParentUrl { get; set; }
    public int TotalLinksFound { get; internal set; }

    public string PartitionKey { get; set; } = string.Empty;
    public string RowKey { get; set; } = string.Empty;
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}
