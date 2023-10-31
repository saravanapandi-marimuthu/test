using Microsoft.Extensions.Logging;

namespace Horizen.DataSprout.Seeders;

public class DataSeeder
{
    private readonly ILogger<DataSeeder> _logger;
    private readonly CompanySeeder _companyServiceTypesSeeder;

    public DataSeeder(ILogger<DataSeeder> logger, CompanySeeder companyServiceTypesSeeder)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _companyServiceTypesSeeder =
            companyServiceTypesSeeder
            ?? throw new ArgumentNullException(nameof(companyServiceTypesSeeder));
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Data");

        await _companyServiceTypesSeeder.SeedAsync();

        _logger.LogInformation("Seeding Complete!");
    }
}
