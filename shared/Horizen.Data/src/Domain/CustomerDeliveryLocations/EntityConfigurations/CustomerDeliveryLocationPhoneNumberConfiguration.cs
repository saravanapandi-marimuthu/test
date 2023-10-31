using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.CustomerDeliveryLocations.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.CustomerDeliveryLocations.EntityConfigurations;

public class CustomerDeliveryLocationPhoneNumberConfiguration
    : BaseModelConfiguration<CustomerDeliveryLocationPhoneNumber>
{
    public override void Configure(EntityTypeBuilder<CustomerDeliveryLocationPhoneNumber> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => new { e.DeliveryLocationId, e.PhoneNumberType });
        builder
            .HasOne(e => e.DeliveryLocation)
            .WithMany(e => e.PhoneNumbers)
            .HasForeignKey(e => e.DeliveryLocationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
