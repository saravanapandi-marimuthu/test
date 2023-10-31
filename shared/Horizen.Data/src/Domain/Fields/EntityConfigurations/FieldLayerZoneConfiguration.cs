using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Fields.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Fields.EntityConfigurations;

public class FieldLayerZoneConfiguration : BaseModelConfiguration<FieldLayerZone>
{
    public override void Configure(EntityTypeBuilder<FieldLayerZone> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.FieldLayer)
            .WithMany(e => (ICollection<FieldLayerZone>)e.FieldLayerZones)
            .HasForeignKey(e => e.FieldLayerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.GeoLocation)
            .WithMany()
            .HasForeignKey(e => e.GeoLocationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
