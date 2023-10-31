using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.RetailOrders.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.RetailOrders.EntityConfigurations;

public class RetailOrderFieldInfoConfiguration : BaseModelConfiguration<RetailOrderFieldInfo>
{
    public override void Configure(EntityTypeBuilder<RetailOrderFieldInfo> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(e => new { e.OrderId, e.FieldId });

        builder
            .HasOne(e => e.Order)
            .WithMany(e => e.RetailOrderFields)
            .HasForeignKey(e => e.OrderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Field)
            .WithMany(e => e.RetailOrdersByField)
            .HasForeignKey(e => e.FieldId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Crop)
            .WithMany()
            .HasForeignKey(e => e.CropId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
