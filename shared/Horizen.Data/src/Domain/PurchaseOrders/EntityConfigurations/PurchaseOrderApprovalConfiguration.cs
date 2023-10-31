using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.PurchaseOrders.EntityConfigurations;

public class PurchaseOrderApprovalConfiguration : BaseModelConfiguration<PurchaseOrderApprover>
{
    public override void Configure(EntityTypeBuilder<PurchaseOrderApprover> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.PurchaseOrder)
            .WithMany(e => e.PurchaseOrderApprovers)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
