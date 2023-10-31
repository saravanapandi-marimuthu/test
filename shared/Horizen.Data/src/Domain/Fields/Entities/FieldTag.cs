using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.Fields.Entities;

public class FieldTag : BaseEntity
{
    public int FieldId { get; set; }
    public int TagId { get; set; }
    public Field Field { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
