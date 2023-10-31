using Horizen.Core.Extensions;
using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Configurations.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Horizen.Data.Services.Configurations;

[DataService]
public class PackageService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<PackageService> _logger;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public PackageService(
        HorizenDbContext context,
        ILogger<PackageService> logger,
        IAuthenticatedUserService authenticatedUserService
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _authenticatedUserService =
            authenticatedUserService
            ?? throw new ArgumentNullException(nameof(authenticatedUserService));
    }

    public async Task<Result<Package>> CreatePackageAsync(CreatePackageInput input)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            if (
                _context.Packages.Any(
                    package => package.NormalizedName == input.Name.ToHorizenNormalizedString()
                )
            )
            {
                return Result<Package>.Failure(
                    $"{nameof(Package)} with name {input.Name} already exists"
                );
            }

            var basePackage = default(Package);

            if (!string.IsNullOrWhiteSpace(input.BasePackageName))
            {
                basePackage = await _context.Packages.FirstOrDefaultAsync(
                    package =>
                        package.NormalizedName == input.BasePackageName.ToHorizenNormalizedString()
                );

                if (basePackage == null)
                {
                    return Result<Package>.Failure(
                        $"Base package with name {input.BasePackageName} does not exist"
                    );
                }
            }

            var baseUnit = await _context.UnitOfMeasurements.FirstOrDefaultAsync(
                uom => uom.NormalizedName == input.UnitName.ToHorizenNormalizedString()
            );

            if (baseUnit == null)
            {
                return Result<Package>.Failure(
                    $"Fundamental Unit of Measurement with name {input.UnitName} does not exist"
                );
            }

            var package = input.ToPackage();
            package.UnitId = baseUnit.Id;
            package.BasePackageId = basePackage?.Id;

            _context.Packages.Add(package);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<Package>.Success(package);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error creating package service");
            return Result<Package>.Failure(ex.Message);
        }
    }

    public async Task<Result<Package>> GetPackageAsync(GetPackageInput input)
    {
        var package = await _context.Packages
            .Include(p => p.BasePackage)
            .Include(p => p.Unit)
            .FirstOrDefaultAsync(p => p.Id == input.Id);

        if (package == null)
        {
            return Result<Package>.Failure($"Package {input.Id} not found");
        }

        return Result<Package>.Success(package);
    }

    public async Task<Result<CollectionResult<Package>>> GetPackagesAsync(GetPackagesInput input)
    {
        _logger.LogInformation(nameof(GetPackagesAsync));

        var query = _context.Packages
            .Include(p => p.BasePackage)
            .Include(p => p.Unit)
            .Where(p => p.NormalizedName.Contains(input.NormalizedSearchTerm));

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        var totalCount = await _context.Packages.CountAsync();

        query = query.Skip(input.Skip).Take(input.GetPageSize());
        var packages = await query.ToListAsync();

        return Result<CollectionResult<Package>>.Success(
            new CollectionResult<Package> { Items = packages, TotalCount = totalCount }
        );
    }
}
