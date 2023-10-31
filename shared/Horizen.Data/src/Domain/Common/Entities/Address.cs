namespace Horizen.Data.Domain.Common.Entities;

public class Address : BaseEntity
{
    public int Id { get; set; }
    public string AddressLine1 { get; set; } = "";
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public string PostalCode { get; set; } = "";
    public string Country { get; set; } = "";
}
