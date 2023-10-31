using Horizen.Core.Extensions;
using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Warehouses.Inputs;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Warehouses.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Horizen.Data.Services.Warehouses;

[DataService]
public class WarehouseService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<WarehouseService> _logger;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public WarehouseService(
        HorizenDbContext context,
        IAuthenticatedUserService authenticatedUserService,
        ILogger<WarehouseService> logger
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _authenticatedUserService =
            authenticatedUserService
            ?? throw new ArgumentNullException(nameof(authenticatedUserService));
    }

    public async Task<Result<Warehouse>> GetWarehouseAsync(GetWarehouseInput input)
    {
        var warehouse = await _context.Warehouses
            .Include(x => x.StorageLocations)
            .Include(w => w.WarehouseAddresses)
            .ThenInclude(ca => ca.Address)
            .Include(w => w.WarehousePhoneNumbers)
            .ThenInclude(cpn => cpn.PhoneNumber)
            .FirstOrDefaultAsync(x => x.Id == input.Id);

        if (warehouse == null)
        {
            _logger.LogInformation($"GetWarehouseAsync: {input.Id} not found");
            return Result<Warehouse>.Failure($"Warehouse {input.Id} not found");
        }

        return Result<Warehouse>.Success(warehouse);
    }

    public async Task<Result<CollectionResult<Warehouse>>> GetWarehousesAsync(
        GetWarehousesInput input
    )
    {
        _logger.LogInformation(nameof(GetWarehousesAsync));

        var warehouses = await _context.Warehouses
            .Include(x => x.StorageLocations)
            .Include(w => w.WarehouseAddresses)
            .ThenInclude(ca => ca.Address)
            .Include(w => w.WarehousePhoneNumbers)
            .ThenInclude(cpn => cpn.PhoneNumber)
            .Where(x => x.RetailerCompanyId == input.RetailerCompanyId)
            .ToListAsync();

        return Result<CollectionResult<Warehouse>>.Success(
            new CollectionResult<Warehouse> { Items = warehouses, TotalCount = warehouses.Count }
        );
    }

    public async Task<Result<Warehouse>> CreateWarehouseAsync(CreateWarehouseInput input)
    {
        try
        {
            Warehouse warehouse = CreateWarehouse(input);
            _context.Warehouses.Add(warehouse);

            await _context.SaveChangesAsync();
            _context.SaveChanges();

            return Result<Warehouse>.Success(warehouse);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating company service");
            return Result<Warehouse>.Failure(ex.Message);
        }
    }

    internal Warehouse CreateWarehouse(CreateWarehouseInput input)
    {
        var warehouse = input.ToWarehouse();

        input.Addresses
            .ToList()
            .ForEach(a =>
            {
                warehouse.WarehouseAddresses.Add(
                    new WarehouseAddress
                    {
                        AddressType = a.AddressType,
                        Address = a.Address.ToAddress(),
                        CreatedBy = "System",
                    }
                );
            });

        input.PhoneNumbers
            .ToList()
            .ForEach(p =>
            {
                warehouse.WarehousePhoneNumbers.Add(
                    new WarehousePhoneNumber
                    {
                        PhoneNumberType = p.PhoneNumberType,
                        PhoneNumber = p.PhoneNumber.ToPhoneNumber(),
                        CreatedBy = "System",
                    }
                );
            });

        return warehouse;
    }

    public async Task<Result<CollectionResult<StorageLocation>>> GetStorageLocationsAsync(
        GetStorageLocationsInput input
    )
    {
        if (input.WarehouseId == 0)
        {
            return Result<CollectionResult<StorageLocation>>.Failure(
                "WarehouseId must be provided"
            );
        }

        var query = _context.StorageLocations.AsQueryable();

        query = query.Where(c => c.WarehouseId == input.WarehouseId);

        var totalCount = await query.CountAsync();

        query = query.Include(c => c.StorageLocationType).ThenInclude(t => t.TagCategory);

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<StorageLocation>>.Success(
            new CollectionResult<StorageLocation> { Items = list, TotalCount = totalCount, }
        );
    }

    public async Task<Result<StorageLocation>> CreateStorageLocationAsync(
        CreateStorageLocationInput input
    )
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var warehouse = await _context.Warehouses.FirstOrDefaultAsync(
                x => x.Id == input.WarehouseId
            );

            if (warehouse == null)
            {
                return Result<StorageLocation>.Failure($"Warehouse {input.WarehouseId} not found");
            }

            if (input.ParentStorageLocationId != null)
            {
                var parentStorageLocation = await _context.StorageLocations.FirstOrDefaultAsync(
                    x => x.Id == input.ParentStorageLocationId
                );

                if (parentStorageLocation == null)
                {
                    return Result<StorageLocation>.Failure(
                        $"Parent Storage Location {input.ParentStorageLocationId} not found"
                    );
                }
            }

            StorageLocation location = await AddStorageLocationToContextAsync(input);

            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return Result<StorageLocation>.Success(location);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating storage location service");
            await transaction.RollbackAsync();
            return Result<StorageLocation>.Failure(ex.Message);
        }
    }

    internal async Task<StorageLocation> AddStorageLocationToContextAsync(
        CreateStorageLocationInput input
    )
    {
        var createdBy =
            _authenticatedUserService.AuthenticatedUser?.User?.Id.ToString() ?? "System";

        var storageLocation = new StorageLocation
        {
            WarehouseId = input.WarehouseId,
            ParentStorageLocationId = input.ParentStorageLocationId,
            Name = input.Name,
            Description = input.Description ?? input.Description,
            Barcode = input.Barcode ?? input.Barcode,
            Notes = input.Notes ?? input.Notes,
            CreatedBy = createdBy,
        };

        var tag = await _context.Tags
            .Where(
                t =>
                    t.NormalizedName
                        == input.StorageLocationTypeTagLink.TagName.ToHorizenNormalizedString()
                    && t.TagCategory.NormalizedName
                        == input.StorageLocationTypeTagLink.TagCategoryName.ToHorizenNormalizedString()
            )
            .FirstOrDefaultAsync();

        if (tag == null)
        {
            throw new Exception(
                $"Tag {input.StorageLocationTypeTagLink.TagName} not found in category {input.StorageLocationTypeTagLink.TagCategoryName}"
            );
        }

        storageLocation.StorageLocationTypeId = tag.Id;

        _context.StorageLocations.Add(storageLocation);
        return storageLocation;
    }

    public async Task<Result<StorageLocation>> GetStorageLocationByIdAsync(
        GetStorageLocationByIdInput input
    )
    {
        var location = await _context.StorageLocations.FirstOrDefaultAsync(x => x.Id == input.Id);

        if (location == null)
        {
            _logger.LogInformation($"GetStorageLocationByIdAsync: {input.Id} not found");
            return Result<StorageLocation>.Failure($"Storage location {input.Id} not found");
        }

        return Result<StorageLocation>.Success(location);
    }

    public async Task<Result<StorageLocation>> UpdateStorageLocationAsync(
        UpdateStorageLocationInput input
    )
    {
        var updatedBy =
            _authenticatedUserService.AuthenticatedUser?.User?.Id.ToString() ?? "System";
        var existingStorageLocation = _context.StorageLocations.Find(input.Id);

        if (existingStorageLocation is null)
        {
            return Result<StorageLocation>.Failure(
                $"StorageLocation with ID {input.Id} not found."
            );
        }

        existingStorageLocation.Name = input.Name;
        existingStorageLocation.Description = input.Description;
        existingStorageLocation.Barcode = input.Barcode;
        existingStorageLocation.Notes = input.Notes;
        existingStorageLocation.ParentStorageLocationId = input.ParentStorageLocationId;
        existingStorageLocation.UpdatedBy = updatedBy;

        var tag = await _context.Tags
            .Where(
                t =>
                    t.NormalizedName
                        == input.StorageLocationTypeTagLink.TagName.ToHorizenNormalizedString()
                    && t.TagCategory.NormalizedName
                        == input.StorageLocationTypeTagLink.TagCategoryName.ToHorizenNormalizedString()
            )
            .FirstOrDefaultAsync();

        if (tag == null)
        {
            throw new Exception(
                $"Tag {input.StorageLocationTypeTagLink.TagName} not found in category {input.StorageLocationTypeTagLink.TagCategoryName}"
            );
        }

        existingStorageLocation.StorageLocationTypeId = tag.Id;

        _context.StorageLocations.Update(existingStorageLocation);
        await _context.SaveChangesAsync();

        return Result<StorageLocation>.Success(existingStorageLocation);
    }
}
