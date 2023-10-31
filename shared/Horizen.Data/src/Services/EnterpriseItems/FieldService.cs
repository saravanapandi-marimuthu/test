using Horizen.Core.Extensions;
using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Services.EnterpriseItems.Inputs;
using Horizen.Data.Services.Results;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.EnterpriseItems.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Horizen.Data.Services.EnterpriseItems;

[DataService]
public class FieldService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<FieldService> _logger;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public FieldService(
        HorizenDbContext context,
        ILogger<FieldService> logger,
        IAuthenticatedUserService authenticatedUserService
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _authenticatedUserService =
            authenticatedUserService
            ?? throw new ArgumentNullException(nameof(authenticatedUserService));
    }

    #region EnterpriseItem CRUD methods
    public async Task<Result<EnterpriseItem>> CreateFieldAsync(CreateFieldInput input)
    {
        if (input.EnterpriseCompanyId == Guid.Empty)
        {
            return Result<EnterpriseItem>.Failure("EnterpriseCompanyId cannot be empty");
        }

        if (string.IsNullOrWhiteSpace(input.FieldName))
        {
            return Result<EnterpriseItem>.Failure("Field name cannot be empty");
        }

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var existingField = _context.Fields.Any(
                f =>
                    f.CompanyId == input.EnterpriseCompanyId
                    && f.NormalizedName == input.FieldName.ToHorizenNormalizedString()
            );

            if (existingField)
            {
                return Result<EnterpriseItem>.Failure(
                    $"Field with name {input.FieldName} already exists"
                );
            }

            // Create the field


            // Create the enterprise item
            var enterpriseItemTag = await _context.Tags
                .Where(
                    t =>
                        t.NormalizedName == "Field".ToHorizenNormalizedString()
                        && t.TagCategory.NormalizedName
                            == "Enterprise Item Type".ToHorizenNormalizedString()
                )
                .FirstAsync();

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result<EnterpriseItem>.Success(null);
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            _logger.LogError(e, "Error creating field");
            return Result<EnterpriseItem>.Failure("Error creating field");
        }
    }

    #endregion
}
