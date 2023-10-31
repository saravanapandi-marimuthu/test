using Horizen.Core.Models.Scraper;
using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.ManufacturerProducts;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Companies.Enums;
using Horizen.Storage.Blobs;
using Microsoft.Extensions.Logging;

namespace Horizen.DataSprout.Seeders;

public class ManufacturersSeeder : ISeeder
{
    private readonly ILogger<ManufacturersSeeder> _logger;

    private readonly CompanyService _companyService;
    private readonly BlobService _blobService;
    private readonly ManufacturerProductService _manufacturerProductService;

    public ManufacturersSeeder(
        ILogger<ManufacturersSeeder> logger,
        CompanyService companyService,
        ManufacturerProductService manufacturerProductService,
        BlobService blobService
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _companyService = companyService ?? throw new ArgumentNullException(nameof(companyService));
        _blobService = blobService ?? throw new ArgumentNullException(nameof(blobService));
        _manufacturerProductService =
            manufacturerProductService
            ?? throw new ArgumentNullException(nameof(manufacturerProductService));
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Manufacturers");

        var manufacturers = await _blobService.DownloadJsonContentAsync<ManufacturerList>(
            "scraped-content",
            "manufacturers/manufacturers.json"
        );

        if (manufacturers == null)
        {
            _logger.LogError("Unable to download manufacturers.json");
            return;
        }

        var index = 0;

        foreach (var manufacturer in manufacturers.Items)
        {
            var input = new CreateCompanyInput
            {
                Name = manufacturer.Label,
                HomepageUrl = manufacturer.HomePage,
                ExternalId = manufacturer.Value.ToString(),
                Services = new List<CompanyServiceTypes> { CompanyServiceTypes.Manufacturer },
                ExtendedProperties = new CompanyExtendedProperties
                {
                    GaPageParam = manufacturer.GaPageParam,
                }
            };

            var result = await _companyService.CreateCompanyAsync(input);

            if (result.IsFailure)
            {
                _logger.LogWarning(result.ErrorMessage);
            }
            else
            {
                _logger.LogInformation($"Created Manufacturer {input.Name}");
            }

            if (index < 2)
            {
                var company = default(Company);

                if (result.IsSuccess)
                {
                    company = result.Value!;
                }
                else
                {
                    company = await _companyService.GetCompanyByNameAsync(input.Name);
                }

                await SeedProductsAsync(company!);
            }

            index++;
        }

        _logger.LogInformation("Seeding Complete!");
    }

    private async Task SeedProductsAsync(Company company)
    {
        var products = await _blobService.DownloadJsonContentAsync<ProductList>(
            "scraped-content",
            $"manufacturers/products-{company.ExternalId}/products.json"
        );

        if (products == null)
        {
            _logger.LogError("Unable to download manufacturers.json");
            return;
        }

        foreach (var product in products.Items)
        {
            var input = new CreateManufacturerProductInput
            {
                ManufacturerCompanyId = company.Id,
                ExternalId = product.Id.ToString(),
                CommonName = product.CommonName,
                ProductName = product.Name,
                LabelDAT = product.LabelDAT,
                EPA = product.EPA,
                IsCanada = product.IsCanada,
                IsCoPack = product.IsCoPack,
                IsUs = product.IsUs,
                ManufacturerName = product.Manufacturer,
                IconUrl = product.IconUrl,
                IconUI = product.IconUI,
                HasIcon = product.HasIcon,
                GaPageParam = product.GaPageParam,
                LogoId = product.LogoId,
                ManId = product.ManId,
            };

            await _manufacturerProductService.CreateManufacturerProductAsync(input);
        }
    }
}
