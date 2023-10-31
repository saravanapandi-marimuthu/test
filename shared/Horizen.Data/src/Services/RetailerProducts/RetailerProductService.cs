using Horizen.Core.Extensions;
using Horizen.Core.Models;
using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Enums;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Horizen.Data.Domain.RetailerProducts.Views;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.RetailerProducts.Inputs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NetTopologySuite.Algorithm;

namespace Horizen.Data.Services.RetailerProducts;

[DataService]
public class RetailerProductService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<RetailerProductService> _logger;

    public RetailerProductService(HorizenDbContext context, ILogger<RetailerProductService> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<Result<RetailerProduct>> CreateRetailerProductAsync(
        CreateRetailerProductInput input
    )
    {
        if (input.RetailerCompanyId == Guid.Empty)
        {
            return Result<RetailerProduct>.Failure("RetailerCompanyId cannot be empty");
        }

        if (string.IsNullOrWhiteSpace(input.ProductName))
        {
            return Result<RetailerProduct>.Failure("ProductName cannot be empty");
        }

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var existingProduct = _context.RetailerProducts.FirstOrDefault(
                x =>
                    x.RetailerCompanyId == input.RetailerCompanyId
                    && x.NormalizedName == input.ProductName.ToHorizenNormalizedString()
            );

            if (existingProduct != null)
            {
                return Result<RetailerProduct>.Failure("Product already exists");
            }

            var product = new RetailerProduct
            {
                RetailerCompanyId = input.RetailerCompanyId,
                NormalizedName = input.ProductName.ToHorizenNormalizedString(),
                ProductName = input.ProductName,
                ProductCategory = input.ProductCategory,
                ProductType = input.ProductType,
                Description = input.Description,
                Notes = input.Notes,
                ImageUrl = input.ImageUrl,
                BrochureUrl = input.BrochureUrl,
                Url = input.Url,
                Sku = input.Sku,
            };

            input.Components
                .ToList()
                .ForEach(
                    x =>
                        product.Components.Add(
                            new RetailerProductComponent
                            {
                                ManufacturerProductId = x.ManufacturerProductId,
                                UnitOfMeasurementId = x.UnitOfMeasurementId,
                                MeasurementValue = x.MeasurementValue,
                            }
                        )
                );

            _context.RetailerProducts.Add(product);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<RetailerProduct>.Success(product);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error creating retailer product");
            return Result<RetailerProduct>.Failure("Error creating retailer product");
        }
    }

    public async Task<Result<bool>> DeleteRetailerProductAsync(DeleteRetailerProductInput input)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var product = await _context.RetailerProducts
                .Include(x => x.Components)
                .FirstOrDefaultAsync(x => x.Id == input.RetailerProductId);

            if (product == null)
            {
                return Result<bool>.Failure("Retailer product not found");
            }

            _context.RetailerProducts.Remove(product);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<bool>.Success(true);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error deleting retailer product");
            return Result<bool>.Failure("Error deleting retailer product");
        }
    }

    public async Task<Result<RetailerProduct>> UpdateRetailerProductAsync(
        UpdateRetailerProductInput input
    )
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var product = await _context.RetailerProducts
                .Include(x => x.Components)
                .FirstOrDefaultAsync(x => x.Id == input.RetailerProductId);

            if (product == null)
            {
                return Result<RetailerProduct>.Failure("Retailer product not found");
            }

            UpdateProduct(input, product);

            UpdatedProductComponents(input, product);

            if (input.RemovedComponents.Any())
            {
                _context.RetailerProductComponents.RemoveRange(
                    _context.RetailerProductComponents.Where(
                        x => input.RemovedComponents.Contains(x.Id)
                    )
                );
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<RetailerProduct>.Success(product);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error updating retailer product");
            return Result<RetailerProduct>.Failure("Error updating retailer product");
        }
    }

    public async Task<Result<RetailerProductComponentCost>> CreateRetailerProductComponentCostAsync(
        CreateRetailerProductComponentCostInput input
    )
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var existingCost = await _context.RetailerProductComponentCosts.FirstOrDefaultAsync(
                x =>
                    x.RetailerProductComponentId == input.RetailerProductComponentId
                    && x.PackageId == input.PackageId
                    && x.StartDate == input.StartDate
                    && x.IsCostOverridden == input.IsCostOverridden
            );

            if (existingCost != null)
            {
                return Result<RetailerProductComponentCost>.Failure("Cost already exists");
            }

            var cost = new RetailerProductComponentCost
            {
                RetailerProductComponentId = input.RetailerProductComponentId,
                PackageId = input.PackageId,
                PackageCost = input.PackageCost,
                StartDate = input.StartDate,
                EndDate = input.EndDate,
                IsCostOverridden = input.IsCostOverridden,
            };

            _context.RetailerProductComponentCosts.Add(cost);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<RetailerProductComponentCost>.Success(cost);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error creating retailer product component cost");
            return Result<RetailerProductComponentCost>.Failure(
                "Error creating retailer product component cost"
            );
        }
    }

    public async Task<Result<RetailerProductComponentCost>> UpdateRetailerProductComponentCostAsync(
        UpdateRetailerProductComponentCostInput input
    )
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var cost = await _context.RetailerProductComponentCosts.FirstOrDefaultAsync(
                x => x.Id == input.RetailerProductComponentCostId
            );

            if (cost == null)
            {
                return Result<RetailerProductComponentCost>.Failure(
                    "Retailer product component cost not found"
                );
            }

            cost.PackageCost = input.PackageCost;
            cost.EndDate = input.EndDate;
            cost.IsCostOverridden = input.IsCostOverridden;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<RetailerProductComponentCost>.Success(cost);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error updating retailer product component cost");
            return Result<RetailerProductComponentCost>.Failure(
                "Error updating retailer product component cost"
            );
        }
    }

    public async Task<Result<RetailerProductPrice>> CreateRetailerProductPriceAsync(
        CreateRetailerProductPriceInput input
    )
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var existingPrice = await _context.RetailerProductPrices.FirstOrDefaultAsync(
                x =>
                    x.RetailerProductId == input.RetailerProductId
                    && x.PackageId == input.PackageId
                    && x.StartDate == input.StartDate
                    && x.IsPriceOverridden == input.IsPriceOverridden
            );

            if (existingPrice != null)
            {
                return Result<RetailerProductPrice>.Failure("Price already exists");
            }

            var price = new RetailerProductPrice
            {
                RetailerProductId = input.RetailerProductId,
                PackageId = input.PackageId,
                PackagePrice = input.PackagePrice,
                StartDate = input.StartDate,
                EndDate = input.EndDate,
                IsPriceOverridden = input.IsPriceOverridden,
            };

            _context.RetailerProductPrices.Add(price);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<RetailerProductPrice>.Success(price);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error creating retailer product price");
            return Result<RetailerProductPrice>.Failure("Error creating retailer product price");
        }
    }

    public async Task<Result<RetailerProductPrice>> UpdateRetailerProductPriceAsync(
        UpdateRetailerProductPriceInput input
    )
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var price = await _context.RetailerProductPrices.FirstOrDefaultAsync(
                x => x.Id == input.RetailerProductPriceId
            );

            if (price == null)
            {
                return Result<RetailerProductPrice>.Failure("Retailer product price not found");
            }

            price.PackagePrice = input.PackagePrice;
            price.EndDate = input.EndDate;
            price.IsPriceOverridden = input.IsPriceOverridden;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<RetailerProductPrice>.Success(price);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error updating retailer product price");
            return Result<RetailerProductPrice>.Failure("Error updating retailer product price");
        }
    }

    public async Task<Result<CollectionResult<RetailerProduct>>> GetRetailerProductsAsync(
        GetRetailerProductsInput input
    )
    {
        if (input.RetailerCompanyId == Guid.Empty)
        {
            return Result<CollectionResult<RetailerProduct>>.Failure(
                "RetailerCompanyId cannot be empty"
            );
        }

        var query = _context.RetailerProducts.AsQueryable();

        query = query.Include(x => x.Components).ThenInclude(x => x.ManufacturerProduct);

        query = query.Where(x => x.RetailerCompanyId == input.RetailerCompanyId);
        if (!string.IsNullOrWhiteSpace(input.NormalizedSearchTerm))
        {
            query = query.Where(x => x.NormalizedName.Contains(input.NormalizedSearchTerm));
        }

        var totalCount = await query.CountAsync();

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<RetailerProduct>>.Success(
            new CollectionResult<RetailerProduct> { Items = list, TotalCount = totalCount, }
        );
    }

    public async Task<Result<RetailerProduct>> GetRetailerProductAsync(
        GetRetailerProductInput input
    )
    {
        var product = await _context.RetailerProducts
            .Include(x => x.Components)
            .ThenInclude(x => x.ManufacturerProduct)
            .FirstOrDefaultAsync(x => x.Id == input.RetailerProductId);

        if (product == null)
        {
            return Result<RetailerProduct>.Failure("Retailer product not found");
        }

        return Result<RetailerProduct>.Success(product);
    }

    public async Task<
        Result<CollectionResult<RetailerProductComponent>>
    > GetRetailerProductComponentsAsync(GetRetailerProductComponentsInput input)
    {
        if (input.RetailerCompanyId == Guid.Empty)
        {
            return Result<CollectionResult<RetailerProductComponent>>.Failure(
                "RetailerCompanyId cannot be empty"
            );
        }

        var query = _context.RetailerProductComponents.AsQueryable();

        query = query
            .Include(rpc => rpc.RetailerProduct)
            .Include(rpc => rpc.ManufacturerProduct)
            .ThenInclude(mp => mp.ManufacturerCompany);

        query = query.Where(r => r.RetailerProduct.RetailerCompanyId == input.RetailerCompanyId);

        if (!string.IsNullOrWhiteSpace(input.SearchTerm))
        {
            query = query.Where(
                r =>
                    r.RetailerProduct.NormalizedName.Contains(input.NormalizedSearchTerm)
                    || r.ManufacturerProduct.NormalizedName.Contains(input.NormalizedSearchTerm)
                    || r.ManufacturerProduct.ManufacturerCompany.NormalizedName.Contains(
                        input.NormalizedSearchTerm
                    )
            );
        }

        var totalCount = await query.CountAsync();

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<RetailerProductComponent>>.Success(
            new CollectionResult<RetailerProductComponent>
            {
                Items = list,
                TotalCount = totalCount,
            }
        );
    }

    public async Task<
        Result<CollectionResult<RetailerProductComponentCostView>>
    > GetRetailerProductComponentCostsAsync(GetRetailerProductComponentCostsInput input)
    {
        var givenDate = input.CostDate ?? DateTime.Today; // Replace with your specific date

        // Flag to decide if packages without costs should be included
        bool includePackagesWithoutCost = true; // Set this to true or false based on your requirements

        var groupedCosts = await _context.RetailerProductComponentCosts
            .Where(
                cost =>
                    (
                        cost.RetailerProductComponentId == input.RetailerProductComponentId
                        && cost.StartDate <= givenDate
                        && (cost.EndDate == null || cost.EndDate >= givenDate)
                    ) || includePackagesWithoutCost
            )
            .GroupBy(cost => cost.PackageId)
            .Select(
                group =>
                    new
                    {
                        PackageId = group.Key,
                        CostDetails = group
                            .OrderByDescending(cost => cost.IsCostOverridden) // Prioritize overridden costs
                            .ThenByDescending(cost => cost.StartDate) // Latest start date in case of multiple costs for the same date
                            .FirstOrDefault()
                    }
            )
            .ToListAsync();

        var results = groupedCosts
            .Select(
                result =>
                    new RetailerProductComponentCostView
                    {
                        Package = result.CostDetails?.Package,
                        PackageCost = result.CostDetails?.PackageCost,
                        StartDate = result.CostDetails?.StartDate,
                        EndDate = result.CostDetails?.EndDate,
                        IsCostOverridden = result.CostDetails?.IsCostOverridden
                    }
            )
            .ToList();

        return Result<CollectionResult<RetailerProductComponentCostView>>.Success(
            new CollectionResult<RetailerProductComponentCostView>
            {
                Items = results,
                TotalCount = results.Count
            }
        );
    }

    public async Task<
        Result<CollectionResult<RetailerProductPriceView>>
    > GetRetailerProductPricesAsync(GetRetailerProductPricesInput input)
    {
        var givenDate = input.PriceDate ?? DateTime.Today; // Replace with your specific date

        // Flag to decide if packages without costs should be included
        bool includePackagesWithoutCost = true; // Set this to true or false based on your requirements

        var groupedPrices = await _context.RetailerProductPrices
            .Where(
                price =>
                    (
                        price.RetailerProductId == input.RetailerProductId
                        && price.StartDate <= givenDate
                        && (price.EndDate == null || price.EndDate >= givenDate)
                    ) || includePackagesWithoutCost
            )
            .GroupBy(cost => cost.PackageId)
            .Select(
                group =>
                    new
                    {
                        PackageId = group.Key,
                        PriceDetails = group
                            .OrderByDescending(cost => cost.IsPriceOverridden) // Prioritize overridden costs
                            .ThenByDescending(cost => cost.StartDate) // Latest start date in case of multiple costs for the same date
                            .FirstOrDefault()
                    }
            )
            .ToListAsync();

        var results = groupedPrices
            .Select(
                result =>
                    new RetailerProductPriceView
                    {
                        Package = result.PriceDetails?.Package,
                        PackagePrice = result.PriceDetails?.PackagePrice,
                        StartDate = result.PriceDetails?.StartDate,
                        EndDate = result.PriceDetails?.EndDate,
                        IsPriceOverridden = result.PriceDetails?.IsPriceOverridden
                    }
            )
            .ToList();

        return Result<CollectionResult<RetailerProductPriceView>>.Success(
            new CollectionResult<RetailerProductPriceView>
            {
                Items = results,
                TotalCount = results.Count
            }
        );
    }

    private static void UpdatedProductComponents(
        UpdateRetailerProductInput input,
        RetailerProduct product
    )
    {
        foreach (var component in product.Components)
        {
            var inputComponent = input.UpdatedComponents.FirstOrDefault(
                x => x.RetailerProductComponentId == component.Id
            );

            if (inputComponent == null)
            {
                continue;
            }

            if (component.ManufacturerProductId != inputComponent.ManufacturerProductId)
            {
                component.ManufacturerProductId = inputComponent.ManufacturerProductId;
            }

            if (component.UnitOfMeasurementId != inputComponent.UnitOfMeasurementId)
            {
                component.UnitOfMeasurementId = inputComponent.UnitOfMeasurementId;
            }

            if (component.MeasurementValue != inputComponent.MeasurementValue)
            {
                component.MeasurementValue = inputComponent.MeasurementValue;
            }
        }
    }

    private static void UpdateProduct(UpdateRetailerProductInput input, RetailerProduct? product)
    {
        if (product == null)
        {
            return;
        }

        if (product.NormalizedName != input.ProductName.ToHorizenNormalizedString())
        {
            product.ProductName = input.ProductName;
            product.NormalizedName = input.ProductName.ToHorizenNormalizedString();
        }

        if (product.BrochureUrl != input.BrochureUrl)
        {
            product.BrochureUrl = input.BrochureUrl;
        }

        if (product.Description != input.Description)
        {
            product.Description = input.Description;
        }

        if (product.ImageUrl != input.ImageUrl)
        {
            product.ImageUrl = input.ImageUrl;
        }

        if (product.Notes != input.Notes)
        {
            product.Notes = input.Notes;
        }

        if (product.ProductCategory != input.ProductCategory)
        {
            product.ProductCategory = input.ProductCategory;
        }

        if (product.ProductType != input.ProductType)
        {
            product.ProductType = input.ProductType;
        }

        if (product.Sku != input.Sku)
        {
            product.Sku = input.Sku;
        }

        if (product.Url != input.Url)
        {
            product.Url = input.Url;
        }
    }
}
