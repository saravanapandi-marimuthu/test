using System.Text.Json;
using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Users.Entities;

public class UserSettings : BaseEntity
{
    public Guid UserId { get; set; }
    public string? AvatarUrl { get; set; }
    public string? AvatarFallbackUrl { get; set; }
    public bool? DarkMode { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }
    public User User { get; set; } = null!;

    public void Dispose() => ExtendedProperties?.Dispose();
}
