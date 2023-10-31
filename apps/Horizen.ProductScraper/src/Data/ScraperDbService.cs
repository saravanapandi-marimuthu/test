using Horizen.ProductScraper.Models;
using Microsoft.EntityFrameworkCore;

namespace Horizen.Scraper.Data;

public class ScraperDbService
{
    private readonly ScraperDbContext _context;

    public ScraperDbService(ScraperDbContext context)
    {
        _context = context;

        _context.Database.EnsureCreated();
    }

    public async Task AddUrlToDownloadAsync(string url)
    {
        var urlToDownload = new UrlToDownload
        {
            Url = url,
            Status = DownloadStatus.NotStarted,
            RetryCount = 0
        };

        _context.Urls.Add(urlToDownload);
        await _context.SaveChangesAsync();
    }

    public async Task<UrlToDownload?> GetUrlToDownloadAsync()
    {
        var urlToDownload = await _context.Urls
            .Where(
                u =>
                    u.Status == DownloadStatus.NotStarted
                    || u.Status == DownloadStatus.Failed && u.RetryCount < 3
            )
            .OrderBy(u => u.Id)
            .FirstOrDefaultAsync();

        if (urlToDownload != null)
        {
            urlToDownload.Status = DownloadStatus.InProgress;
            await _context.SaveChangesAsync();
        }

        return urlToDownload;
    }

    public async Task MarkUrlAsCompletedAsync(UrlToDownload urlToDownload)
    {
        urlToDownload.Status = DownloadStatus.Completed;
        await _context.SaveChangesAsync();
    }

    public async Task MarkUrlAsCompletedAsync(string url)
    {
        var urlToDownload = await _context.Urls.Where(u => u.Url == url).FirstOrDefaultAsync();

        if (urlToDownload != null)
        {
            urlToDownload.Status = DownloadStatus.Completed;
            await _context.SaveChangesAsync();
        }
    }

    public async Task MarkUrlAsFailedAsync(UrlToDownload urlToDownload)
    {
        urlToDownload.Status = DownloadStatus.Failed;
        urlToDownload.RetryCount++;
        await _context.SaveChangesAsync();
    }

    public async Task MarkUrlAsFailedAsync(string url)
    {
        var urlToDownload = await _context.Urls.Where(u => u.Url == url).FirstOrDefaultAsync();

        if (urlToDownload != null)
        {
            urlToDownload.Status = DownloadStatus.Failed;
            urlToDownload.RetryCount++;
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddUrlsToDownloadAsync(IEnumerable<string> urls)
    {
        var urlsToDownload = urls.Select(
            url =>
                new UrlToDownload
                {
                    Url = url,
                    Status = DownloadStatus.NotStarted,
                    RetryCount = 0
                }
        );

        _context.Urls.AddRange(urlsToDownload);
        await _context.SaveChangesAsync();
    }
}
