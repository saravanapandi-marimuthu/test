using System.Text.Json.Serialization;

namespace Horizen.Data.Domain.ManufacturerProducts.Models;

public class ProductItem
{
    [JsonPropertyName("Id")]
    public int Id { get; set; }

    [JsonPropertyName("Name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("LabelDAT")]
    public string LabelDAT { get; set; } = string.Empty;

    [JsonPropertyName("LogoId")]
    public int LogoId { get; set; }

    [JsonPropertyName("ManId")]
    public int ManId { get; set; }

    [JsonPropertyName("EPA")]
    public string EPA { get; set; } = string.Empty;

    [JsonPropertyName("Manufacturer")]
    public string Manufacturer { get; set; } = string.Empty;

    [JsonPropertyName("CommonName")]
    public string CommonName { get; set; } = string.Empty;

    [JsonPropertyName("HasIcon")]
    public bool HasIcon { get; set; }

    [JsonPropertyName("IconUrl")]
    public string IconUrl { get; set; } = string.Empty;

    [JsonPropertyName("IconUI")]
    public string IconUI { get; set; } = string.Empty;

    [JsonPropertyName("gaPageParam")]
    public string GaPageParam { get; set; } = string.Empty;

    [JsonPropertyName("IsUs")]
    public bool IsUs { get; set; }

    [JsonPropertyName("IsCanada")]
    public bool IsCanada { get; set; }

    [JsonPropertyName("IsCoPack")]
    public bool IsCoPack { get; set; }
}
