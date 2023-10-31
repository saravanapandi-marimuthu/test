using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Common.Enums;

namespace Horizen.Data.Domain.CustomerDeliveryLocations.Entities;

public class CustomerDeliveryLocationAddress : BaseEntity
{
    public int DeliveryLocationId { get; set; }
    public int AddressId { get; set; }
    public AddressType AddressType { get; set; }
    public CustomerDeliveryLocation DeliveryLocation { get; set; } = null!;
    public Address Address { get; set; } = null!;
}
