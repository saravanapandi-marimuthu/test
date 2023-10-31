using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Domain.ManufacturerProducts.Entities;

public class ManufacturerPrice : BaseEntity
{
    public int Id { get; set; }
    public int ManufacturerProductId { get; set; }
    public bool Override { get; set; }
    public int PackageId { get; set; }
    public decimal PackagePrice { get; set; }
    public decimal MapPrice { get; set; }
    public decimal MsrpPrice { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public ManufacturerProduct ManufacturerProduct { get; set; } = null!;
    public Package Package { get; set; } = null!;

    [NotMapped]
    public bool IsActive => DateTime.Now >= StartDate && DateTime.Now <= EndDate;
}
