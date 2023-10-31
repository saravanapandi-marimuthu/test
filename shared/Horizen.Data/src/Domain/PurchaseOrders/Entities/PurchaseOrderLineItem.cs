using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Entities;

namespace Horizen.Data.Domain.PurchaseOrders.Entities;

public class PurchaseOrderLineItem : BaseEntity
{
    public int Id { get; set; }
    public int PurchaseOrderId { get; set; }
    public int ProductId { get; set; }
    public float OrderedQty { get; set; }
    public float? ReceivedQty { get; set; }
    public int PackageId { get; set; }
    public float UnitPrice { get; set; }
    public float? OrderQtyByPackage { get; set; }
    public float? ReceivedQtyByPackage { get; set; }
    public float? UnitPriceByPackage { get; set; }
    public string? BatchNumber { get; set; }
    public DateTime? ExpectedDeliveryDate { get; set; }
    public DateTime? DateReceived { get; set; }
    public float TotalPrice { get; set; }
    public string? SdsUrl { get; set; }
    public string? RegulatoryInfo { get; set; }
    public string? SpecialHandlingInstructions { get; set; }
    public string? ReturnPolicy { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public PurchaseOrder PurchaseOrder { get; set; } = null!;
    public ManufacturerProduct Product { get; set; } = null!;
    public UnitOfMeasurement UnitOfMeasurement { get; set; } = null!;
    public ICollection<PurchaseOrderDiscount> PurchaseOrderDiscounts { get; set; } =
        new List<PurchaseOrderDiscount>();

    public Package Package { get; set; } = null!;

    public void Dispose() => ExtendedProperties?.Dispose();
}
