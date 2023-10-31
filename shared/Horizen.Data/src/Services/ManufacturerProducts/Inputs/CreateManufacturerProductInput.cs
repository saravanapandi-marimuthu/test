using Horizen.Core.Extensions;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Enums;

namespace Horizen.Data.Services.ManufacturerProducts;

public class CreateManufacturerProductInput
{
    public Guid ManufacturerCompanyId { get; set; }
    public string? ExternalId { get; set; }
    public string ProductName { get; set; } = "";
    public ProductCategory? ProductCategory { get; set; }
    public ProductType? ProductType { get; set; }
    public string? UPC { get; set; }
    public string? ProductSku { get; set; }
    public string? BarCode { get; set; }
    public string? LabelDAT { get; set; }
    public int LogoId { get; set; }
    public int ManId { get; set; }
    public string? EPA { get; set; }
    public string? ManufacturerName { get; set; }
    public string? CommonName { get; set; }
    public bool? HasIcon { get; set; }
    public string? IconUrl { get; set; }
    public string? IconUI { get; set; }
    public string? GaPageParam { get; set; }
    public bool IsUs { get; set; }
    public bool IsCanada { get; set; }
    public bool IsCoPack { get; set; }

    internal ManufacturerProduct ToManufacturerProduct()
    {
        return new ManufacturerProduct
        {
            ManufacturerCompanyId = ManufacturerCompanyId,
            ExternalId = ExternalId,
            NormalizedName = ProductName.ToHorizenNormalizedString(),
            ProductName = ProductName,
            ProductType = ProductType,
            ProductCategory = ProductCategory,
            UPC = UPC,
            ProductSku = ProductSku,
            BarCode = BarCode,
            LabelDAT = LabelDAT,
            LogoId = LogoId,
            ManId = ManId,
            EPA = EPA,
            ManufacturerName = ManufacturerName,
            CommonName = CommonName,
            HasIcon = HasIcon,
            IconUrl = IconUrl,
            IconUI = IconUI,
            GaPageParam = GaPageParam,
            IsUs = IsUs,
            IsCanada = IsCanada,
            IsCoPack = IsCoPack,
        };
    }
}
