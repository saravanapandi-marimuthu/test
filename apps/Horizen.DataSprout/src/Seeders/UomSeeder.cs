using Horizen.Data.Services.Configurations;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Core.Utilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Horizen.DataSprout.Seeders;

public class UomSeeder : ISeeder
{
    private readonly ILogger<UomSeeder> _logger;
    private readonly string _dataPath;

    private readonly string _uomFile = "uoms.json";
    private readonly UnitOfMeasurementService _uomService;

    public UomSeeder(
        ILogger<UomSeeder> logger,
        IConfiguration configuration,
        UnitOfMeasurementService uomService
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
        _uomService = uomService ?? throw new ArgumentNullException(nameof(uomService));
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding UOMs");

        var uoms = await JsonUtility.LoadFromFileAsync<ICollection<CreateUnitOfMeasurementInput>>(
            Path.Combine(_dataPath, _uomFile)
        );

        foreach (var uom in uoms)
        {
            var result = await _uomService.CreateUnitOfMeasurementAsync(uom);

            if (result.IsFailure)
            {
                _logger.LogWarning(result.ErrorMessage);
            }
            else
            {
                _logger.LogInformation($"Created UOM {uom.UnitName}");
            }
        }

        _logger.LogInformation("Seeding Complete!");
    }
}
