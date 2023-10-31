using Horizen.Core.Attributes;
using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Configurations.Entities;

public class PaymentTerm : BaseEntity
{
    public int Id { get; set; }

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = "";
    public string TermName { get; set; } = "";
    public string? Description { get; set; }
    public int DueDays { get; set; }
}
