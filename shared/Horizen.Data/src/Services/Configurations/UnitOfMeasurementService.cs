using Horizen.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Core.Extensions;
using Horizen.Data.Attributes;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations;

[DataService]
public class UnitOfMeasurementService
{
    private readonly ILogger<UnitOfMeasurementService> _logger;
    private readonly HorizenDbContext _context;

    public UnitOfMeasurementService(
        HorizenDbContext context,
        ILogger<UnitOfMeasurementService> logger
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<Result<UnitOfMeasurement>> CreateUnitOfMeasurementAsync(
        CreateUnitOfMeasurementInput input
    )
    {
        // Check if the unit of measurement already exists
        if (
            _context.UnitOfMeasurements.Any(
                uom => uom.NormalizedName == input.UnitName.ToHorizenNormalizedString()
            )
        )
        {
            return Result<UnitOfMeasurement>.Failure(
                $"Unit of Measurement with name {input.UnitName} already exists"
            );
        }

        var uom = input.ToUnitOfMeasurement();

        if (!string.IsNullOrWhiteSpace(input.BaseUnitName))
        {
            var baseUnit = await _context.UnitOfMeasurements.FirstOrDefaultAsync(
                x => x.NormalizedName == input.BaseUnitName.ToHorizenNormalizedString()
            );

            if (baseUnit == null)
            {
                return Result<UnitOfMeasurement>.Failure(
                    $"Base Unit of Measurement with name {input.BaseUnitName} does not exist"
                );
            }

            uom.BaseUnitId = baseUnit.Id;
        }

        if (!string.IsNullOrWhiteSpace(input.NumeratorUnitName))
        {
            var numeratorUnit = await _context.UnitOfMeasurements.FirstOrDefaultAsync(
                x => x.Name == input.NumeratorUnitName.ToHorizenNormalizedString()
            );

            if (numeratorUnit == null)
            {
                return Result<UnitOfMeasurement>.Failure(
                    $"Numerator Unit of Measurement with name {input.NumeratorUnitName} does not exist"
                );
            }

            uom.NumeratorUnitId = numeratorUnit.Id;
        }

        if (!string.IsNullOrWhiteSpace(input.DenominatorUnitName))
        {
            var denominatorUnit = await _context.UnitOfMeasurements.FirstOrDefaultAsync(
                x => x.Name == input.DenominatorUnitName.ToHorizenNormalizedString()
            );

            if (denominatorUnit == null)
            {
                return Result<UnitOfMeasurement>.Failure(
                    $"Denominator Unit of Measurement with name {input.DenominatorUnitName} does not exist"
                );
            }

            uom.DenominatorUnitId = denominatorUnit.Id;
        }

        _context.UnitOfMeasurements.Add(uom);

        await _context.SaveChangesAsync();

        return Result<UnitOfMeasurement>.Success(uom);
    }

    public async Task<Result<CollectionResult<UnitOfMeasurement>>> GetUnitOfMeasurementsAsync(
        GetUnitOfMeasurementsInput input
    )
    {
        var query = _context.UnitOfMeasurements
            .Where(t => t.Name.Contains(input.NormalizedSearchTerm))
            .Skip(input.Skip)
            .Take(input.GetPageSize());

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        var totalCount = await _context.UnitOfMeasurements.CountAsync();

        var list = await query.ToListAsync();

        return Result<CollectionResult<UnitOfMeasurement>>.Success(
            new CollectionResult<UnitOfMeasurement> { Items = list, TotalCount = totalCount, }
        );
    }
}
