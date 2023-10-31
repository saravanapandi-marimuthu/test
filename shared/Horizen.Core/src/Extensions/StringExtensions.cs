namespace Horizen.Core.Extensions;

public static class StringExtensions
{
    public static string ToHorizenNormalizedString(this string input)
    {
        return input.Trim().ToLowerInvariant();
    }
}
