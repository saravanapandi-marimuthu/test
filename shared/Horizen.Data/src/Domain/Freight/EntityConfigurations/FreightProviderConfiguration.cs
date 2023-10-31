using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Freight.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Freight.EntityConfigurations;

public class FreightProviderConfiguration : BaseModelConfiguration<FreightProvider>
{
    public override void Configure(EntityTypeBuilder<FreightProvider> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasMany(e => e.FreightRates)
            .WithOne(e => e.FreightProvider)
            .HasForeignKey(e => e.FreightProviderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
