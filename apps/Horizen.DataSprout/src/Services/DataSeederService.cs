using Horizen.Data.Services.Users;
using Horizen.DataSprout.Seeders;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Horizen.DataSprout.Services;

public class DataSeederService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IHostApplicationLifetime _appLifetime;
    private readonly ILogger<DataSeederService> _logger;

    public DataSeederService(
        IServiceProvider serviceProvider,
        IHostApplicationLifetime appLifetime,
        ILogger<DataSeederService> logger
    )
    {
        _serviceProvider =
            serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
        _appLifetime = appLifetime ?? throw new ArgumentNullException(nameof(appLifetime));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Starting DataSeederService");

        var seederTypesInOrder = new List<Type>
        {
            typeof(TagSeeder),
            typeof(CompanySeeder),
            typeof(UserSeeder),
            typeof(UserRoleSeeder),
            typeof(UomSeeder),
            typeof(PaymentTermsSeeder),
            typeof(RelatedCompanySeeder),
            typeof(ManufacturersSeeder),
            typeof(PackageSeeder),
        };

        // Testing a specific Seeder
        //seederTypesInOrder = new List<Type> { typeof(ManufacturersSeeder) };

        foreach (var seederType in seederTypesInOrder)
        {
            await ProcessSeeder(seederType);
        }

        _logger.LogInformation("Seeding Complete!");

        _appLifetime.StopApplication();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    private async Task ProcessSeeder<TSeeder>()
        where TSeeder : ISeeder
    {
        using var scope = _serviceProvider.CreateScope();

        var seeder =
            scope.ServiceProvider.GetService<TSeeder>()
            ?? throw new Exception("Unable to create DataSeeder");

        await seeder.SeedAsync();
    }

    private async Task ProcessSeeder(Type seederType)
    {
        if (seederType.GetInterfaces().Contains(typeof(ISeeder)))
        {
            using var scope = _serviceProvider.CreateScope();

            var seederInstance =
                scope.ServiceProvider.GetService(seederType) as ISeeder
                ?? throw new Exception($"Unable to create {seederType.FullName}");

            await seederInstance.SeedAsync();
        }
    }
}
