using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Horizen.Core.Extensions;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Services.PurchaseOrders.Inputs;
using Horizen.Data.Domain.Companies.Entities;

namespace Horizen.Data.Services.PurchaseOrders;

[DataService]
public class PurchaseOrderService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<PurchaseOrderService> _logger;
    private readonly CompanyService _companyService;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public PurchaseOrderService(
        HorizenDbContext context,
        ILogger<PurchaseOrderService> logger,
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

    public async Task<Result<PurchaseOrder>> CreatePurchaseOrderAsync(
        CreatePurchaseOrderInput input
    )
    {
        if (input.CompanyId == Guid.Empty && !string.IsNullOrWhiteSpace(input.CompanyId.ToString()))
        {
            return Result<PurchaseOrder>.Failure("CompanyId must be provided");
        }

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var relatedCompany = default(Company);

            if (input.CompanyId != Guid.Empty)
            {
                relatedCompany = await _companyService.GetCompanyByIdAsync(input.CompanyId);
            }

            if (relatedCompany == null)
            {
                return Result<PurchaseOrder>.Failure(
                    $"Company with Id {input.CompanyId} not found"
                );
            }

            var purchaseOrder = input.ToPurchaseOrder();

            input.LineItems
                .ToList()
                .ForEach(
                    x =>
                        purchaseOrder.PurchaseOrderLineItems.Add(
                            new PurchaseOrderLineItem
                            {
                                ProductId = x.ProductId,
                                OrderedQty = x.OrderedQty,
                                PackageId = x.PackageId,
                                UnitPrice = x.UnitPrice,
                                Notes = x.Notes
                            }
                        )
                );

            _context.PurchaseOrders.Add(purchaseOrder);

            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return Result<PurchaseOrder>.Success(purchaseOrder);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating purchase order service");
            return Result<PurchaseOrder>.Failure(ex.Message);
        }
    }

    public async Task<Result<CollectionResult<PurchaseOrder>>> GetPurchaseOrderAsync(
        GetPurchaseOrdersInput input
    )
    {
        var query = _context.PurchaseOrders.AsQueryable();

        if (input.CompanyId.HasValue)
        {
            query = query.Where(x => x.CompanyId == input.CompanyId);
        }

        var totalCount = await query.CountAsync();

        query = query
            .Include(p => p.VendorCompany)
            .Include(p => p.Company)
            .Include(p => p.PurchaseOrderLineItems)
            .Include(p => p.PurchaseOrderApprovers)
            .Include(p => p.PurchaseOrderFees)
            .Include(p => p.PurchaseOrderDiscounts)
            .Include(p => p.RetailOrder)
            .Include(p => p.PaymentTerm)
            .Include(p => p.BillingAccount);

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<PurchaseOrder>>.Success(
            new CollectionResult<PurchaseOrder> { Items = list, TotalCount = totalCount, }
        );
    }
}
