using Horizen.Core.Extensions;
using Horizen.Data.Domain.Common.Enums;

namespace Horizen.Data.Domain.Common.Entities;

public abstract class AddressWithType : BaseEntity
{
    public int AddressId { get; set; }
    public AddressType AddressType { get; set; } = AddressType.Billing;
    public string AddressTypeName => AddressType.GetEnumName() ?? "Unknown";
}
