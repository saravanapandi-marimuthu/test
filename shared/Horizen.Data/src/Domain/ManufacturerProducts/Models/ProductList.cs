using System.Text.Json.Serialization;

namespace Horizen.Data.Domain.ManufacturerProducts.Models;

public class ProductList
{
    [JsonPropertyName("Lst")]
    public List<ProductItem> Items { get; set; } = new List<ProductItem>();
}
