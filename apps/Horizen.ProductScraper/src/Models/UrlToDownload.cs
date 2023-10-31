namespace Horizen.ProductScraper.Models;

public class UrlToDownload
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public DownloadStatus Status { get; set; }
    public int RetryCount { get; set; }
}

public enum DownloadStatus
{
    NotStarted,
    InProgress,
    Completed,
    Failed
}
