using Microsoft.Extensions.Logging;
using Horizen.Data.Errors;
using Microsoft.Extensions.Configuration;
using Horizen.Core.Utilities;
using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Companies.Inputs;

namespace Horizen.DataSprout.Seeders;

public class CompanySeeder : ISeeder
{
    private ILogger<CompanySeeder> _logger;
    private CompanyService _companyService;
    private string _dataPath;
    private readonly string _companySeedFile = "companies.json";
    private readonly string _labSeedFile = "labs.json";

    public CompanySeeder(
        ILogger<CompanySeeder> logger,
        IConfiguration configuration,
        CompanyService companyService
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _companyService = companyService ?? throw new ArgumentNullException(nameof(companyService));

        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Companies");

        // var metadata = typeof(CompanyServiceType).GetEnumValuesWithMetadata<CompanyServiceType>();

        // foreach (var (Value, Name, Description) in metadata)
        // {
        //     Console.WriteLine($"Value: {Value}, Name: {Name}, Description: {Description}");
        // }

        await SeedCompaniesAsync(_companySeedFile);
        await SeedCompaniesAsync(_labSeedFile);
    }

    public async Task SeedCompaniesAsync(string seedFile)
    {
        _logger.LogInformation($"Seeding Companies {seedFile}");

        var companies = await JsonUtility.LoadFromFileAsync<ICollection<CreateCompanyInput>>(
            Path.Combine(_dataPath, seedFile)
        );

        foreach (var company in companies)
        {
            try
            {
                await _companyService.CreateCompanyAsync(company);
            }
            catch (EntityAlreadyExistsException ex)
            {
                _logger.LogWarning(ex.Message);
            }
        }
    }
}
