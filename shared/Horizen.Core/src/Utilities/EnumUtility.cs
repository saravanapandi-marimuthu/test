using Horizen.Core.Models;

namespace Horizen.Core.Utilities;

public static class EnumUtility
{
    public static List<EnumInfo<TEnum>> GetFlagsInfo<TEnum>(TEnum flagValue, TEnum ignoreValue)
        where TEnum : struct, Enum
    {
        var items = new List<EnumInfo<TEnum>>();
        var enumType = typeof(TEnum);

        foreach (TEnum value in Enum.GetValues(enumType))
        {
            if (
                flagValue.HasFlag(value)
                && !EqualityComparer<TEnum>.Default.Equals(value, ignoreValue)
            )
            {
                items.Add(new EnumInfo<TEnum>(value));
            }
        }

        return items;
    }

    public static EnumInfo<TEnum> GetInfo<TEnum>(TEnum value)
        where TEnum : struct, Enum
    {
        return new EnumInfo<TEnum>(value);
    }

    public static List<EnumInfo<TEnum>> GetAllInfo<TEnum>(TEnum ignoreValue)
        where TEnum : struct, Enum
    {
        var items = new List<EnumInfo<TEnum>>();
        var enumType = typeof(TEnum);

        foreach (TEnum value in Enum.GetValues(enumType))
        {
            if (!EqualityComparer<TEnum>.Default.Equals(value, ignoreValue))
            {
                items.Add(new EnumInfo<TEnum>(value));
            }
        }

        return items;
    }
}
