using Horizen.Data.Services.Configurations;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Core.Utilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Horizen.DataSprout.Seeders;

public class PaymentTermsSeeder : ISeeder
{
    private readonly ILogger<PaymentTermsSeeder> _logger;
    private readonly string _dataPath;

    private readonly string _paymentTermsFile = "payment-terms.json";
    private readonly PaymentTermService _paymentTermsService;

    public PaymentTermsSeeder(
        ILogger<PaymentTermsSeeder> logger,
        IConfiguration configuration,
        PaymentTermService paymentTermsService
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
        _paymentTermsService =
            paymentTermsService ?? throw new ArgumentNullException(nameof(paymentTermsService));
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Payment Terms");

        var paymentTerms = await JsonUtility.LoadFromFileAsync<ICollection<CreatePaymentTermInput>>(
            Path.Combine(_dataPath, _paymentTermsFile)
        );

        foreach (var uom in paymentTerms)
        {
            var result = await _paymentTermsService.CreatePaymentTermAsync(uom);

            if (result.IsFailure)
            {
                _logger.LogWarning(result.ErrorMessage);
            }
            else
            {
                _logger.LogInformation($"Created UOM {uom.TermName}");
            }
        }

        _logger.LogInformation("Seeding Complete!");
    }
}
