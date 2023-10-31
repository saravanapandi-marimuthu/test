using System.Text.Json;
using Horizen.Data.Domain.Accounts.Entities;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.PurchaseOrders.Enums;
using Horizen.Data.Domain.RetailOrders.Entities;

namespace Horizen.Data.Domain.PurchaseOrders.Entities;

public class PurchaseOrder : BaseEntity
{
    public int Id { get; set; }
    public int? RetailOrderId { get; set; }
    public Guid CompanyId { get; set; } = Guid.Empty;
    public string OrderNumber { get; set; } = "";
    public int BillingAccountId { get; set; }
    public Guid? VendorCompanyId { get; set; }
    public PurchaseOrderStatus OrderStatus { get; set; }
    public DateTime? DateApproved { get; set; }
    public DateTime? DateOrdered { get; set; }
    public DateTime? ExpectedDeliveryDate { get; set; }
    public DateTime? DateReceived { get; set; }
    public float TotalPrice { get; set; }
    public int PaymentTermsId { get; set; }
    public string TrackingNumber { get; set; } = "";
    public string? Notes { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }

    public Company Company { get; set; } = null!;
    public Company? VendorCompany { get; set; }

    public RetailOrder? RetailOrder { get; set; }

    public PaymentTerm PaymentTerm { get; set; } = null!;
    public BillingAccount BillingAccount { get; set; } = null!;

    public ICollection<PurchaseOrderLineItem> PurchaseOrderLineItems { get; set; } =
        new List<PurchaseOrderLineItem>();
    public ICollection<PurchaseOrderApprover> PurchaseOrderApprovers { get; set; } =
        new List<PurchaseOrderApprover>();
    public ICollection<PurchaseOrderFee> PurchaseOrderFees { get; set; } =
        new List<PurchaseOrderFee>();
    public ICollection<PurchaseOrderDiscount> PurchaseOrderDiscounts { get; set; } =
        new List<PurchaseOrderDiscount>();

    public void Dispose() => ExtendedProperties?.Dispose();
}
