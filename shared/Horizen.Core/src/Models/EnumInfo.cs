using Horizen.Core.Extensions;

namespace Horizen.Core.Models;

public class EnumInfo<T>
    where T : struct, Enum
{
    private const int MAX_COLORS = 15;

    public T Value { get; set; } = default!;
    public string Name { get; set; } = string.Empty;

    public int Index { get; set; }
    public int ColorIndex { get; set; }

    public EnumInfo(T value)
    {
        Value = value;
        Name = value.GetEnumName() ?? string.Empty;
        Index = value.GetEnumIndex();
        ColorIndex = Index % MAX_COLORS;
    }
}
