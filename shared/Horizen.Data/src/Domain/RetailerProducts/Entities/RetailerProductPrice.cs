using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.RetailerProducts.Entities;

public class RetailerProductPrice : BaseEntity
{
    public int Id { get; set; }
    public int RetailerProductId { get; set; }

    /// <summary>
    /// /// Temporary override price for the RetailerProduct
    /// </summary> <summary>
    ///
    /// </summary>
    /// <value></value>
    public bool IsPriceOverridden { get; set; }
    public int PackageId { get; set; }
    public decimal PackagePrice { get; set; }
    public decimal MapPrice { get; set; }
    public decimal MsrpPrice { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public RetailerProduct RetailerProduct { get; set; } = null!;
    public Package Package { get; set; } = null!;

    [NotMapped]
    public bool IsActive => DateTime.Now >= StartDate && DateTime.Now <= EndDate;
}
