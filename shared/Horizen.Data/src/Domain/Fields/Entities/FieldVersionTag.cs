using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.Fields.Entities;

public class FieldVersionTag : BaseEntity
{
    public int FieldVersionId { get; set; }
    public int TagId { get; set; }
    public FieldVersion FieldVersion { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
