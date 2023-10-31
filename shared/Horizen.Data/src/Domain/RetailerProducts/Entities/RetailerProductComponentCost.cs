using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.RetailerProducts.Entities;

public class RetailerProductComponentCost : BaseEntity
{
    public int Id { get; set; }
    public Guid RetailerCompanyId { get; set; }
    public int RetailerProductComponentId { get; set; }

    /// <summary>
    /// Temporary override price for a product
    /// </summary> <summary>
    ///
    /// </summary>
    /// <value></value>
    public bool IsCostOverridden { get; set; }
    public int PackageId { get; set; }
    public decimal PackageCost { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public RetailerProduct RetailerProduct { get; set; } = null!;
    public Package Package { get; set; } = null!;

    [NotMapped]
    public bool IsActive => DateTime.Now >= StartDate && DateTime.Now <= EndDate;

    public RetailerProductComponent RetailerProductComponent { get; set; } = null!;
}
