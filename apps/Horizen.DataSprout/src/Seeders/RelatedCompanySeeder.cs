using Microsoft.Extensions.Logging;
using Horizen.Data.Errors;
using Microsoft.Extensions.Configuration;
using Horizen.Core.Utilities;
using Horizen.Data.Services.RelatedCompanies;
using Horizen.Data.Services.RelatedCompanies.Inputs;

namespace Horizen.DataSprout.Seeders;

public class RelatedCompanySeeder : ISeeder
{
    private ILogger<CompanySeeder> _logger;
    private RelatedCompanyService _companyService;
    private string _dataPath;
    private readonly string _customerCompaniesSeedFile = "sample-customers.json";
    private readonly string _farmEnterpriseCompaniesSeedFile = "sample-farm-enterprises.json";

    private readonly string _vendorCompaniesSeedFile = "sample-vendors.json";

    public RelatedCompanySeeder(
        ILogger<CompanySeeder> logger,
        IConfiguration configuration,
        RelatedCompanyService companyService
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _companyService = companyService ?? throw new ArgumentNullException(nameof(companyService));

        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Companies");

        await SeedCompaniesAsync(_customerCompaniesSeedFile);
        await SeedCompaniesAsync(_farmEnterpriseCompaniesSeedFile);
    }

    private async Task SeedCompaniesAsync(string seedFile)
    {
        var companies = await JsonUtility.LoadFromFileAsync<ICollection<CreateRelatedCompanyInput>>(
            Path.Combine(_dataPath, seedFile)
        );

        foreach (var company in companies)
        {
            try
            {
                await _companyService.CreateRelatedCompanyAsync(company);
            }
            catch (EntityAlreadyExistsException ex)
            {
                _logger.LogWarning(ex.Message);
            }
        }
    }
}
