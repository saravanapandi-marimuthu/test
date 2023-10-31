using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.Fields.Entities;

namespace Horizen.Data.Domain.RetailOrders.Entities;

public class RetailOrderFieldInfo : BaseEntity
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int FieldId { get; set; }
    public int CropId { get; set; }
    public float EstimatedAcres { get; set; }
    public float BillableAcres { get; set; }
    public RetailOrder Order { get; set; } = null!;
    public Field Field { get; set; } = null!;
    public Tag Crop { get; set; } = null!;
}
