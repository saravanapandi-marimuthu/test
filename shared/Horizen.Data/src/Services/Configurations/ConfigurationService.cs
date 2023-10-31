using Horizen.Core.Models;
using Horizen.Core.Utilities;
using Horizen.Data.Domain.ManufacturerProducts.Enums;
using Horizen.Data.Domain.RetailOrders.Entities;
using Horizen.Data.Domain.UserRoles.Enums;
using Horizen.Data.Services.Results;
using Microsoft.Extensions.Logging;

namespace Horizen.Data.Services.Configurations;

public class ConfigurationService
{
    private readonly ILogger<ConfigurationService> _logger;

    public ConfigurationService(ILogger<ConfigurationService> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public static CollectionResult<EnumInfo<ProductCategory>> GetProductCategories()
    {
        var items = EnumUtility.GetAllInfo(ProductCategory.Unknown);

        return new CollectionResult<EnumInfo<ProductCategory>>
        {
            Items = items,
            TotalCount = items.Count,
        };
    }

    public static CollectionResult<EnumInfo<ProductType>> GetProductTypes()
    {
        var items = EnumUtility.GetAllInfo(ProductType.Unknown);

        return new CollectionResult<EnumInfo<ProductType>>
        {
            Items = items,
            TotalCount = items.Count,
        };
    }

    public static CollectionResult<EnumInfo<RoleTypes>> GetRoleTypes()
    {
        var items = EnumUtility.GetAllInfo(RoleTypes.Unassigned);

        return new CollectionResult<EnumInfo<RoleTypes>>
        {
            Items = items,
            TotalCount = items.Count,
        };
    }

    public static CollectionResult<EnumInfo<RetailOrderTypes>> GetRetailOrderTypes()
    {
        var items = EnumUtility.GetAllInfo(RetailOrderTypes.None);

        return new CollectionResult<EnumInfo<RetailOrderTypes>>
        {
            Items = items,
            TotalCount = items.Count,
        };
    }
}
