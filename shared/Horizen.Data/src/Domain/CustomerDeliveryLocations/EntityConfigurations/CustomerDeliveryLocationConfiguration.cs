using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.CustomerDeliveryLocations.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.CustomerDeliveryLocations.EntityConfigurations;

public class CustomerDeliveryLocationConfiguration
    : BaseModelConfiguration<CustomerDeliveryLocation>
{
    public override void Configure(EntityTypeBuilder<CustomerDeliveryLocation> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder
            .HasOne(e => e.Customer)
            .WithMany(e => e.CustomerDeliveryLocations)
            .HasForeignKey(e => e.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.Addresses)
            .WithOne(e => e.DeliveryLocation)
            .HasForeignKey(e => e.DeliveryLocationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PhoneNumbers)
            .WithOne(e => e.DeliveryLocation)
            .HasForeignKey(e => e.DeliveryLocationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
