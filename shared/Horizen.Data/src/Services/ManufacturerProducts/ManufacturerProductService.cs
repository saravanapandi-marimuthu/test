using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Horizen.Core.Extensions;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.ManufacturerProducts.Entities;

namespace Horizen.Data.Services.ManufacturerProducts;

[DataService]
public class ManufacturerProductService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<ManufacturerProductService> _logger;
    private readonly CompanyService _companyService;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public ManufacturerProductService(
        HorizenDbContext context,
        ILogger<ManufacturerProductService> logger,
        CompanyService companyService,
        IAuthenticatedUserService authenticatedUserService
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _companyService = companyService ?? throw new ArgumentNullException(nameof(companyService));
        _authenticatedUserService =
            authenticatedUserService
            ?? throw new ArgumentNullException(nameof(authenticatedUserService));
    }

    public async Task<Result<ManufacturerProduct>> CreateManufacturerProductAsync(
        CreateManufacturerProductInput input
    )
    {
        try
        {
            var product = input.ToManufacturerProduct();

            var query = _context.ManufacturerProducts.AsQueryable();

            if (string.IsNullOrWhiteSpace(input.ExternalId))
            {
                query = query.Where(x => x.ExternalId == input.ExternalId);
            }

            query = query.Where(
                x =>
                    x.ManufacturerCompanyId == input.ManufacturerCompanyId
                    && x.ProductName == input.ProductName
            );

            var existingProduct = await query.FirstOrDefaultAsync();

            if (existingProduct != null)
            {
                return Result<ManufacturerProduct>.Failure("Product already exists");
            }

            _context.ManufacturerProducts.Add(product);

            await _context.SaveChangesAsync();
            _context.SaveChanges();

            return Result<ManufacturerProduct>.Success(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating company service");
            return Result<ManufacturerProduct>.Failure(ex.Message);
        }
    }

    public async Task<Result<CollectionResult<ManufacturerProduct>>> GetManufacturerProductAsync(
        GetManufacturerProductsInput input
    )
    {
        var query = _context.ManufacturerProducts.AsQueryable();

        if (!string.IsNullOrWhiteSpace(input.NormalizedSearchTerm))
        {
            query = query.Where(
                t =>
                    t.ProductName != null
                        && t.ProductName.ToLower().Contains(input.NormalizedSearchTerm.ToLower())
                    || (
                        t.ManufacturerName != null
                        && t.ManufacturerName
                            .ToLower()
                            .Contains(input.NormalizedSearchTerm.ToLower())
                    )
                    || (
                        t.CommonName != null
                        && t.CommonName.ToLower().Contains(input.NormalizedSearchTerm.ToLower())
                    )
            );
        }

        if (input.ManufacturerCompanyId.HasValue)
        {
            query = query.Where(x => x.ManufacturerCompanyId == input.ManufacturerCompanyId);
        }

        var totalCount = await query.CountAsync();

        query = query.Include(p => p.ManufacturerCompany);

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<ManufacturerProduct>>.Success(
            new CollectionResult<ManufacturerProduct> { Items = list, TotalCount = totalCount, }
        );
    }
}
