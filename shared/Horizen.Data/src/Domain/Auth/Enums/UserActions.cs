namespace Horizen.Data.Domain.Auth.Enums;

[Flags]
public enum UserActions : uint
{
    None = 0,
    Create = 1 << 0,
    Read = 1 << 1,
    Update = 1 << 2,
    Delete = 1 << 3,

    GodMode = 1 << 30,
    All = ~None,
}
