using Horizen.Data.Domain.Accounts.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Domain.PurchaseOrders.Enums;

namespace Horizen.Data.Services.PurchaseOrders;

public class CreatePurchaseOrderInput
{
    public int? RetailOrderId { get; set; }

    public Guid CompanyId { get; set; }

    public string OrderNumber { get; set; } = "";

    public int BillingAccountId { get; set; }

    public int PaymentTermsId { get; set; }

    public Guid? VendorCompanyId { get; set; }

    public PurchaseOrderStatus OrderStatus { get; set; }

    public string TrackingNumber { get; set; } = "";

    public string? Notes { get; set; }

    public DateTime? DateOrdered { get; set; }

    public ICollection<CreatePurchaseOrderLineItemInput> LineItems { get; set; } =
        new List<CreatePurchaseOrderLineItemInput>();

    internal PurchaseOrder ToPurchaseOrder()
    {
        return new PurchaseOrder
        {
            RetailOrderId = RetailOrderId,
            CompanyId = CompanyId,
            OrderNumber = OrderNumber,
            VendorCompanyId = VendorCompanyId,
            BillingAccountId = BillingAccountId,
            OrderStatus = OrderStatus,
            TrackingNumber = TrackingNumber,
            PaymentTermsId = PaymentTermsId,
            Notes = Notes,
            DateOrdered = DateOrdered
        };
    }
}

public class CreatePurchaseOrderLineItemInput
{
    public int ProductId { get; set; }

    public int OrderedQty { get; set; }

    public int PackageId { get; set; }

    public float UnitPrice { get; set; }

    public string? Notes { get; set; }
}
