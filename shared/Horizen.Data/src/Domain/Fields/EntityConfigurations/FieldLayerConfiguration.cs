using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Fields.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Fields.EntityConfigurations;

public class FieldLayerConfiguration : BaseModelConfiguration<FieldLayer>
{
    public override void Configure(EntityTypeBuilder<FieldLayer> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasAlternateKey(
            e =>
                new
                {
                    e.FieldVersionId,
                    e.LayerType,
                    e.ManuallyGenerated,
                    e.LayerName
                }
        );

        builder
            .HasOne(e => e.FieldVersion)
            .WithMany(e => e.FieldLayers)
            .HasForeignKey(e => e.FieldVersionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.FieldLayerZones)
            .WithOne(e => e.FieldLayer)
            .HasForeignKey(e => e.FieldLayerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
