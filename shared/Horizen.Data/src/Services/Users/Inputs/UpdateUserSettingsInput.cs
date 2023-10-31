using System.Text.Json;
using Horizen.Data.Domain.Users.Entities;

namespace Horizen.Data.Services.Users.Inputs;

public class UpdateUserSettingsInput
{
    public Guid UserId { get; set; }
    public string? AvatarUrl { get; set; }
    public bool? DarkMode { get; set; }
    public JsonDocument? ExtendedProperties { get; set; }

    internal UserSettings? ToUserSettings()
    {
        return new UserSettings
        {
            UserId = UserId,
            AvatarUrl = AvatarUrl,
            DarkMode = DarkMode,
            ExtendedProperties = ExtendedProperties
        };
    }
}
