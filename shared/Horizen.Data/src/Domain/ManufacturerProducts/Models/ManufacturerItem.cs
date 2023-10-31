using System.Text.Json.Serialization;

namespace Horizen.Data.Domain.ManufacturerProducts.Models;

public class ManufacturerItem
{
    [JsonPropertyName("value")]
    public int Value { get; set; }

    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    [JsonPropertyName("HomePage")]
    public string HomePage { get; set; } = string.Empty;

    [JsonPropertyName("gaPageParam")]
    public string GaPageParam { get; set; } = string.Empty;
}
