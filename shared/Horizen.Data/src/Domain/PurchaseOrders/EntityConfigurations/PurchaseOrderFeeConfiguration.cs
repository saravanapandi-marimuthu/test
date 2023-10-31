using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.PurchaseOrders.EntityConfigurations;

public class PurchaseOrderFeeConfiguration : BaseModelConfiguration<PurchaseOrderFee>
{
    public override void Configure(EntityTypeBuilder<PurchaseOrderFee> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.PurchaseOrder)
            .WithMany(e => e.PurchaseOrderFees)
            .HasForeignKey(e => e.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.FeeType)
            .WithMany()
            .HasForeignKey(e => e.FeeTypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
