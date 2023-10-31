using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Freight.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Freight.EntityConfigurations;

public class FreightRateConfiguration : BaseModelConfiguration<FreightRate>
{
    public override void Configure(EntityTypeBuilder<FreightRate> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.FreightProvider)
            .WithMany(e => e.FreightRates)
            .HasForeignKey(e => e.FreightProviderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Zone)
            .WithMany(e => e.Rates)
            .HasForeignKey(e => e.ZoneId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
