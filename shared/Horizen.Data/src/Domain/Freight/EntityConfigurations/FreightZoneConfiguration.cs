using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Freight.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Freight.EntityConfigurations;

public class FreightZoneConfiguration : BaseModelConfiguration<FreightZone>
{
    public override void Configure(EntityTypeBuilder<FreightZone> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasMany(e => e.Rates)
            .WithOne(e => e.Zone)
            .HasForeignKey(e => e.ZoneId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
