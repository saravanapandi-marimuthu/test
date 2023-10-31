using System.Text.Json;
using Horizen.Core.Models.Scraper;
using Microsoft.Extensions.Configuration;
using PuppeteerSharp;
using Horizen.Storage.Tables;
using Horizen.Storage.Blobs;
using System.Text;
using System.Net.Mime;

namespace Horizen.Scraper.Services;

public class CdmsDataDownloader
{
    private const string _allManufacturersUrl = "https://www.cdms.net/labelssds/Home/ManList?Keys=";
    private string _basePath = "./data";

    private readonly IConfiguration _configuration;
    private readonly UrlTableService _urlTableService;
    private readonly BlobService _blobService;
    private static IBrowser _browser = null!;

    public CdmsDataDownloader(
        UrlTableService urlTableService,
        BlobService blobService,
        IConfiguration configuration
    )
    {
        _urlTableService = urlTableService;
        _blobService = blobService;
        _configuration = configuration;

        var basePath = _configuration.GetValue<string>("DataPath");
        _basePath = basePath ?? _basePath;
    }

    public async Task StartAsync()
    {
        await new BrowserFetcher().DownloadAsync();
        _browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });

        var urlEntity = await _urlTableService.GetUrlToDownloadAsync();

        if (urlEntity == null)
        {
            await _urlTableService.AddUrlToDownloadAsync(_allManufacturersUrl, null);
        }

        while (true)
        {
            urlEntity = await _urlTableService.GetUrlToDownloadAsync();

            if (urlEntity == null)
            {
                break;
            }

            var url = urlEntity.Url;

            if (url.Contains("ManList"))
            {
                await DownloadManufacturerAsync(urlEntity);
            }
            else if (url.Contains("ProductList"))
            {
                await DownloadProductsAsync(urlEntity);
            }
            else if (url.Contains("DocumentList"))
            {
                await DownloadDocumentsAsync(urlEntity);
            }
            else if (url.Contains("ProductAvail"))
            {
                await DownloadAvailabilityAsync(urlEntity);
            }
        }
    }

    private static int RandomIntFromInterval(int min, int max)
    {
        Random random = new Random();
        return random.Next(min, max + 1);
    }

    private async Task<string> DownloadJson(string url)
    {
        var page = await _browser.NewPageAsync();
        int delayMs = RandomIntFromInterval(1500, 3500);

        Console.WriteLine($"Processing {url}. Wait time: {delayMs}ms");

        await page.GoToAsync(url);

        var jsonContent = await page.EvaluateFunctionAsync<string>("() => document.body.innerText");

        //var jsonContent = await page.GetContentAsync();

        await page.CloseAsync();

        await Task.Delay(delayMs);

        return jsonContent;
    }

    public async Task DownloadManufacturerAsync(UrlEntity urlEntity)
    {
        var json = await DownloadJson(urlEntity.Url);
        var path = $"{_basePath}/manufacturers.json";

        bool hasError = false;

        try
        {
            await _blobService.UploadContentAsync(
                "scraped-content",
                $"manufacturers/manufacturers.json",
                new MemoryStream(Encoding.UTF8.GetBytes(json)),
                MediaTypeNames.Application.Json
            );

            var manufacturers = JsonSerializer.Deserialize<ManufacturerList>(json);

            if (manufacturers == null)
            {
                throw new Exception("Manufacturers is null");
            }

            // For each of the manufacturers, build the URL and add it to the database
            manufacturers.Items
                .Take(2)
                .ToList()
                .ForEach(async manufacturer =>
                {
                    var productsUrl = GetManufactureProductsUrl(manufacturer.Value.ToString());
                    await _urlTableService.AddUrlToDownloadAsync(productsUrl, urlEntity.Url);
                });

            // We have processed this url, mark it as completed

            Console.WriteLine($"Found {manufacturers?.Items?.Count ?? 0} manufacturers");
            await _urlTableService.UpdateUrlAfterAttemptAsync(
                urlEntity.RowKey,
                true,
                manufacturers?.Items?.Count ?? 0
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);
            hasError = true;
        }

        if (hasError)
        {
            await _urlTableService.UpdateUrlAfterAttemptAsync(urlEntity.RowKey, false);
        }
    }

    public async Task DownloadProductsAsync(UrlEntity urlEntity)
    {
        var json = await DownloadJson(urlEntity.Url);
        var manId = urlEntity.Url.Split("=")[1];

        bool hasError = false;
        try
        {
            await _blobService.UploadContentAsync(
                "scraped-content",
                $"manufacturers/products-{manId}/products.json",
                new MemoryStream(Encoding.UTF8.GetBytes(json)),
                MediaTypeNames.Application.Json
            );

            var products = JsonSerializer.Deserialize<ProductList>(json);

            if (products == null)
            {
                throw new Exception("Products is null");
            }

            // For each of the manufacturers, build the URL and add it to the database
            products.Items.ForEach(async product =>
            {
                var documentsUrl = GetDocumentsListUrl(product.Id.ToString());
                await _urlTableService.AddUrlToDownloadAsync(documentsUrl, urlEntity.Url);

                var availabilityUrl = GetProductAvailabilityUrl(product.Id.ToString());
                await _urlTableService.AddUrlToDownloadAsync(availabilityUrl, urlEntity.Url);
            });

            Console.WriteLine($"Found {products?.Items?.Count ?? 0} products");

            await _urlTableService.UpdateUrlAfterAttemptAsync(
                urlEntity.RowKey,
                true,
                products?.Items?.Count ?? 0
            );

            // We have processed this url, mark it as completed
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);
            hasError = true;
        }

        if (hasError)
        {
            await _urlTableService.UpdateUrlAfterAttemptAsync(urlEntity.RowKey, false);
        }
    }

    private async Task DownloadAvailabilityAsync(UrlEntity urlEntity)
    {
        var json = await DownloadJson(urlEntity.Url);
        var productId = urlEntity.Url.Split("=")[1];

        var manId = urlEntity.ParentUrl?.Split("=")[1] ?? "0";

        bool hasError = false;
        try
        {
            await _blobService.UploadContentAsync(
                "scraped-content",
                $"manufacturers/products-{manId}/product-{productId}/availability.json",
                new MemoryStream(Encoding.UTF8.GetBytes(json)),
                MediaTypeNames.Application.Json
            );

            // We have processed this url, mark it as completed
            await _urlTableService.UpdateUrlAfterAttemptAsync(urlEntity.RowKey, true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);
            hasError = true;
        }

        if (hasError)
        {
            await _urlTableService.UpdateUrlAfterAttemptAsync(urlEntity.RowKey, false);
        }
    }

    private async Task DownloadDocumentsAsync(UrlEntity urlEntity)
    {
        var json = await DownloadJson(urlEntity.Url);
        var productId = urlEntity.Url.Split("=")[1];

        var manId = urlEntity.ParentUrl?.Split("=")[1] ?? "0";

        bool hasError = false;
        try
        {
            await _blobService.UploadContentAsync(
                "scraped-content",
                $"manufacturers/products-{manId}/product-{productId}/documents.json",
                new MemoryStream(Encoding.UTF8.GetBytes(json)),
                MediaTypeNames.Application.Json
            );

            // We have processed this url, mark it as completed
            await _urlTableService.UpdateUrlAfterAttemptAsync(urlEntity.RowKey, true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);
            hasError = true;
        }

        if (hasError)
        {
            await _urlTableService.UpdateUrlAfterAttemptAsync(urlEntity.RowKey, false);
        }
    }

    public Task LoadManufacturersAsync()
    {
        var path = $"{_basePath}/manufacturers.json";

        if (!File.Exists(path))
        {
            throw new FileNotFoundException("Manufacturers file not found", path);
        }

        var json = File.ReadAllText(path);
        var manufacturers = JsonSerializer.Deserialize<ManufacturerList>(json);
        Console.WriteLine($"Found {manufacturers?.Items?.Count ?? 0} manufacturers");

        return Task.CompletedTask;
    }

    private string GetManufactureProductsUrl(string manufacturerId) =>
        $"https://www.cdms.net/labelssds/Home/ProductList?manId={manufacturerId}";

    private string GetDocumentsListUrl(string productId) =>
        $"https://www.cdms.net/labelssds/Home/DocumentList?productId={productId}";

    private string GetProductAvailabilityUrl(string productId) =>
        $"https://www.cdms.net/labelssds/Home/ProductAvail?productId={productId}";
}
