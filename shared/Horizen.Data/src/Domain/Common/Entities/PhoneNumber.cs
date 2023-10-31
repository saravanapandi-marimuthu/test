namespace Horizen.Data.Domain.Common.Entities;

public class PhoneNumber : BaseEntity
{
    public int Id { get; set; }
    public string MainNumber { get; set; } = "";
    public string? Extension { get; set; }
}
