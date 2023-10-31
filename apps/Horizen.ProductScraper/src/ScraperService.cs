using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Horizen.Scraper.Services;

public class ScraperService : IHostedService //, IAsyncDisposable
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IHostApplicationLifetime _appLifetime;
    private readonly ILogger<ScraperService> _logger;

    public ScraperService(
        IServiceProvider serviceProvider,
        IHostApplicationLifetime appLifetime,
        ILogger<ScraperService> logger
    )
    {
        _serviceProvider =
            serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
        _appLifetime = appLifetime ?? throw new ArgumentNullException(nameof(appLifetime));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    // public ValueTask DisposeAsync()
    // {
    //     //throw new NotImplementedException();
    //     return Task.FromResult(0);
    // }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();

        var downloader =
            scope.ServiceProvider.GetService<CdmsDataDownloader>()
            ?? throw new Exception("Unable to create CdmsDataDownloader");

        _logger.LogInformation("Starting ScraperService");
        await downloader.StartAsync();
        _logger.LogInformation("Finished ScraperService");

        _appLifetime.StopApplication();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}
