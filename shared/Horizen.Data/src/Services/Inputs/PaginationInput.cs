using Horizen.Core.Attributes;
using Horizen.Core.Extensions;

namespace Horizen.Data.Services.Inputs;

public abstract class PaginationInput
{
    private const int MaxPageSize = 10;
    public string? SearchTerm { get; set; } = "";

    public int? Page { get; set; } = 0;

    public int? PageSize { get; set; } = MaxPageSize;

    public string? SortBy { get; set; }

    public bool? SortDesc { get; set; } = false;

    public int GetPageSize()
    {
        return PageSize ?? MaxPageSize;
    }

    public int GetPage()
    {
        return Page ?? 0;
    }

    [SkipInGraphQL]
    public int Skip => GetPage() * GetPageSize();

    [SkipInGraphQL]
    public int Take => GetPageSize();

    [SkipInGraphQL]
    public string NormalizedSearchTerm => SearchTerm?.ToHorizenNormalizedString() ?? "";
}
