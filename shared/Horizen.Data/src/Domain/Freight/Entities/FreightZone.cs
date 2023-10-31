using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Freight.Entities;

public class FreightZone : BaseEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public ICollection<FreightRate> Rates = new List<FreightRate>();
}
