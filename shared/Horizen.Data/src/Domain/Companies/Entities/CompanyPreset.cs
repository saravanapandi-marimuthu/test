using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.Companies.Entities;

public class CompanyPreset : BaseEntity
{
    public Guid CompanyId { get; set; }
    public string Currency { get; set; } = "USD";
    public string CurrencySymbol { get; set; } = "$";
    public string? CurrencyFormat { get; set; } = "#,##0.00";
    public string Timezone { get; set; } = "America/New_York";
    public string Locale { get; set; } = "en-US";
    public string DateFormat { get; set; } = "MM/dd/yyyy";
    public string TimeFormat { get; set; } = "hh:mm tt";
    public string DateTimeFormat { get; set; } = "MM/dd/yyyy hh:mm tt";
    public int DefaultPaymentTermId { get; set; }
    public int PurchaseOrderStartingNumber { get; set; } = 1;
    public int RetailOrderStartingNumber { get; set; } = 1;
    public int InvoiceStartingNumber { get; set; } = 1;
    public string? PurchaseOrderNumberFormat { get; set; } = "000000";
    public string? RetailOrderNumberFormat { get; set; } = "000000";
    public string? InvoiceNumberFormat { get; set; } = "000000";
    public string? PurchaseOrderNumberPrefix { get; set; } = "";
    public string? RetailOrderNumberPrefix { get; set; } = "";
    public string? InvoiceNumberPrefix { get; set; } = "";

    public CompanyPresetExtendedProperties ExtendedProperties { get; set; } =
        new CompanyPresetExtendedProperties();

    public PaymentTerm DefaultPaymentTerm { get; set; } = null!;
    public Company Company { get; set; } = null!;
}

public class CompanyPresetExtendedProperties
{
    public string? Version { get; set; }
}
