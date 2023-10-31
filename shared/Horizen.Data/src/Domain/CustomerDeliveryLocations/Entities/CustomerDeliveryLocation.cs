using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.CompanyRelationships.Entities;

namespace Horizen.Data.Domain.CustomerDeliveryLocations.Entities;

public class CustomerDeliveryLocation : BaseEntity
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string DeliverLocationName { get; set; } = "";
    public string? Notes { get; set; }
    public CompanyRelationship? Customer { get; set; }
    public ICollection<CustomerDeliveryLocationAddress> Addresses { get; set; } = null!;
    public ICollection<CustomerDeliveryLocationPhoneNumber> PhoneNumbers { get; set; } = null!;
}
