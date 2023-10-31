using Horizen.Data.Services.Configurations;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Core.Utilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Horizen.DataSprout.Seeders;

public class PackageSeeder : ISeeder
{
    private readonly ILogger<PackageSeeder> _logger;
    private readonly string _dataPath;

    private readonly string _uomFile = "packages.json";
    private readonly PackageService _packageService;

    public PackageSeeder(
        ILogger<PackageSeeder> logger,
        IConfiguration configuration,
        PackageService packageService
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
        _packageService = packageService ?? throw new ArgumentNullException(nameof(packageService));
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Packages");

        var packages = await JsonUtility.LoadFromFileAsync<ICollection<CreatePackageInput>>(
            Path.Combine(_dataPath, _uomFile)
        );

        foreach (var package in packages)
        {
            var result = await _packageService.CreatePackageAsync(package);

            if (result.IsFailure)
            {
                _logger.LogWarning("{message}", result.ErrorMessage);
            }
            else
            {
                _logger.LogInformation("Created package {packageName}", package.Name);
            }
        }

        _logger.LogInformation("Seeding Complete!");
    }
}
