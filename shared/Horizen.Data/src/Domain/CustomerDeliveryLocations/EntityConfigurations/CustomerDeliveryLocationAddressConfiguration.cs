using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.CustomerDeliveryLocations.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.CustomerDeliveryLocations.EntityConfigurations;

public class CustomerDeliveryLocationAddressConfiguration
    : BaseModelConfiguration<CustomerDeliveryLocationAddress>
{
    public override void Configure(EntityTypeBuilder<CustomerDeliveryLocationAddress> builder)
    {
        base.Configure(builder);

        builder.HasKey(
            e =>
                new
                {
                    e.DeliveryLocationId,
                    e.AddressId,
                    e.AddressType
                }
        );
        builder
            .HasOne(e => e.DeliveryLocation)
            .WithMany(e => e.Addresses)
            .HasForeignKey(e => e.DeliveryLocationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(e => e.Address)
            .WithMany()
            .HasForeignKey(e => e.AddressId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
