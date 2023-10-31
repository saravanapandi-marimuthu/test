// See https://aka.ms/new-console-template for more information

using Horizen.Data;
using Horizen.Storage;
using Horizen.Scraper.Data;
using Horizen.Scraper.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

var configuration = builder.Configuration;

builder.Services
    .AddHostedService<ScraperService>()
    .AddTransient<CdmsDataDownloader>()
    .AddHorizenStorage("StorageConnection")
    .AddHorizenDb(configuration, "DefaultConnection")
    .AddDbContext<ScraperDbContext>(options =>
    {
        var connectionString = configuration.GetConnectionString("SqliteConnection");

        options.UseSqlite(connectionString);
    })
    .AddTransient<ScraperDbService>()
    .AddSingleton<IAuthenticatedUserService, FakeAuthenticatedUserService>();

using IHost host = builder.Build();

await host.RunAsync();
