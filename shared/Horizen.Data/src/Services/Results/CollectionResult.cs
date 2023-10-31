namespace Horizen.Data.Services.Results;

public class CollectionResult<T>
{
    public List<T> Items { get; set; } = new List<T>();
    public int TotalCount { get; set; }
}
