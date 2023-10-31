using System.Reflection;
using Horizen.Core.Attributes;

namespace Horizen.Core.Extensions;

public static class EnumExtensions
{
    public static IEnumerable<(
        TEnum Value,
        string Name,
        string? Description
    )> GetEnumValuesWithMetadata<TEnum>(this Type type)
        where TEnum : struct, Enum
    {
        if (!type.IsEnum)
        {
            throw new ArgumentException("Type must be an enumeration.", nameof(type));
        }

        foreach (var field in type.GetFields(BindingFlags.Public | BindingFlags.Static))
        {
            if (
                Attribute.GetCustomAttribute(field, typeof(EnumMetadataAttribute))
                is EnumMetadataAttribute attribute
            )
            {
                yield return ((TEnum)field.GetValue(null)!, attribute.Name, attribute.Description);
            }
            else
            {
                yield return ((TEnum)field.GetValue(null)!, field.Name, null);
            }
        }
    }

    public static TEnum? GetEnumValueByName<TEnum>(string name)
        where TEnum : struct, Enum
    {
        foreach (var (Value, Name, _) in typeof(TEnum).GetEnumValuesWithMetadata<TEnum>())
        {
            if (string.Equals(Name, name, StringComparison.Ordinal))
            {
                return Value;
            }
        }

        // Fallback to the intrinsic enum name if no match is found in custom attributes
        if (Enum.TryParse<TEnum>(name, out TEnum result))
        {
            return result;
        }

        return null;
    }

    public static string? GetEnumName<TEnum>(this TEnum value)
        where TEnum : struct, Enum
    {
        foreach (var (Value, Name, _) in typeof(TEnum).GetEnumValuesWithMetadata<TEnum>())
        {
            if (EqualityComparer<TEnum>.Default.Equals(Value, value))
            {
                return Name;
            }
        }

        return Enum.GetName(value);
    }

    public static int GetEnumIndex<TEnum>(this TEnum value)
        where TEnum : struct, Enum
    {
        var index = 0;

        foreach (var (Value, _, _) in typeof(TEnum).GetEnumValuesWithMetadata<TEnum>())
        {
            if (EqualityComparer<TEnum>.Default.Equals(Value, value))
            {
                return index;
            }

            index++;
        }

        return -1;
    }
}
