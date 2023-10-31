using Horizen.Core.Extensions;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations.Inputs;

public class CreatePaymentTermInput
{
    public string TermName { get; set; } = "";
    public string? Description { get; set; }
    public int DueDays { get; set; }

    internal PaymentTerm ToPaymentTerm()
    {
        return new PaymentTerm
        {
            NormalizedName = TermName.ToHorizenNormalizedString(),
            TermName = TermName,
            Description = Description,
            CreatedBy = "System",
        };
    }
}
