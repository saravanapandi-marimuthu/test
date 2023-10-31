using System.Text.Json.Serialization;

namespace Horizen.Data.Domain.ManufacturerProducts.Models;

public class ManufacturerList
{
    [JsonPropertyName("Lst")]
    public List<ManufacturerItem> Items { get; set; } = new List<ManufacturerItem>();
}
