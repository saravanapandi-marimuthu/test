using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;

namespace Horizen.Storage.Blobs;

public class BlobService
{
    private readonly ILogger<BlobService> _logger;
    private readonly object? _connectionString;
    private readonly BlobServiceClient _blobServiceClient;

    public BlobService(ILogger<BlobService> logger, string connectionString)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _connectionString =
            connectionString ?? throw new ArgumentNullException(nameof(_connectionString));

        _blobServiceClient = new BlobServiceClient(connectionString);
    }

    public async Task UploadContentAsync(
        string containerName,
        string blobName,
        Stream content,
        string contentType = ""
    )
    {
        // Create or get a reference to the blob container
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        await blobContainerClient.CreateIfNotExistsAsync();

        // Get a reference to the blob
        var blobClient = blobContainerClient.GetBlobClient(blobName);

        // Create BlobUploadOptions
        var uploadOptions = new BlobUploadOptions();

        if (!string.IsNullOrEmpty(contentType))
        {
            uploadOptions.HttpHeaders = new BlobHttpHeaders { ContentType = contentType };
        }

        // Upload content to the blob
        await blobClient.UploadAsync(content, uploadOptions, cancellationToken: default);
    }

    public async Task<T?> DownloadJsonContentAsync<T>(string containerName, string blobName)
    {
        var blobClient = _blobServiceClient
            .GetBlobContainerClient(containerName)
            .GetBlobClient(blobName);

        var downloadInfo = await blobClient.DownloadContentAsync();

        var response = downloadInfo.Value.Content.ToObjectFromJson<T>();

        return response;
    }

    public string GenerateBlobSasToken(string containerName, string blobName)
    {
        var blobClient = _blobServiceClient
            .GetBlobContainerClient(containerName)
            .GetBlobClient(blobName);

        var sasBuilder = new BlobSasBuilder(
            BlobContainerSasPermissions.Read,
            DateTimeOffset.UtcNow.AddHours(1)
        )
        {
            BlobContainerName = containerName,
            BlobName = blobName,
            Resource = "b", // "b" for blob
            StartsOn = DateTimeOffset.UtcNow.AddMinutes(-5), // optional time buffer
            ExpiresOn = DateTimeOffset.UtcNow.AddHours(1), // 1 hour access
        };

        var sasToken = blobClient.GenerateSasUri(sasBuilder);
        return sasToken.ToString();
    }
}
