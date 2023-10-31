using Microsoft.EntityFrameworkCore;
using Horizen.Data.Context;
using Microsoft.Extensions.Logging;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Configurations.Inputs;
using Horizen.Core.Extensions;
using Horizen.Data.Attributes;
using Horizen.Data.Domain.Configurations.Entities;

namespace Horizen.Data.Services.Configurations;

[DataService]
public class PaymentTermService
{
    private readonly ILogger<PaymentTermService> _logger;
    private readonly HorizenDbContext _context;

    public PaymentTermService(HorizenDbContext context, ILogger<PaymentTermService> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<Result<PaymentTerm>> CreatePaymentTermAsync(CreatePaymentTermInput input)
    {
        // Check if the unit of measurement already exists
        if (
            _context.PaymentTerms.Any(
                term => term.NormalizedName == input.TermName.ToHorizenNormalizedString()
            )
        )
        {
            return Result<PaymentTerm>.Failure(
                $"Payment Term with name {input.TermName} already exists"
            );
        }

        var term = input.ToPaymentTerm();

        _context.PaymentTerms.Add(term);

        await _context.SaveChangesAsync();

        return Result<PaymentTerm>.Success(term);
    }

    public async Task<Result<CollectionResult<PaymentTerm>>> GetPaymentTermsAsync(
        GetPaymentTermsInput input
    )
    {
        var query = _context.PaymentTerms
            .Where(t => t.NormalizedName.Contains(input.NormalizedSearchTerm))
            .Skip(input.Skip)
            .Take(input.GetPageSize());

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        var totalCount = await _context.PaymentTerms.CountAsync();

        var list = await query.ToListAsync();

        return Result<CollectionResult<PaymentTerm>>.Success(
            new CollectionResult<PaymentTerm> { Items = list, TotalCount = totalCount, }
        );
    }
}
