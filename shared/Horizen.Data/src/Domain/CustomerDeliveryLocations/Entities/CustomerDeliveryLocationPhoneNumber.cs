using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Common.Enums;

namespace Horizen.Data.Domain.CustomerDeliveryLocations.Entities;

public class CustomerDeliveryLocationPhoneNumber : BaseEntity
{
    public int DeliveryLocationId { get; set; }
    public PhoneNumberType PhoneNumberType { get; set; }
    public string PhoneNumber { get; set; } = "";
    public CustomerDeliveryLocation DeliveryLocation { get; set; } = null!;
}
