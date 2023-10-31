using Horizen.Core.Extensions;
using Horizen.Data.Domain.Common.Enums;

namespace Horizen.Data.Domain.Common.Entities;

public abstract class PhoneNumberWithType : BaseEntity
{
    public int PhoneNumberId { get; set; }
    public PhoneNumberType PhoneNumberType { get; set; } = PhoneNumberType.Work;
    public string PhoneNumberTypeName => PhoneNumberType.GetEnumName() ?? "Unknown";
}
