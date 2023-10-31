using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.EnterpriseItems.Inputs;

public class CreateBillingSplitInput
{
    public Guid AccountCompanyId { get; set; }
    public double SplitPercentage { get; set; }
    public ICollection<TagLinkInput>? SplitTierTagLink { get; set; }
}
