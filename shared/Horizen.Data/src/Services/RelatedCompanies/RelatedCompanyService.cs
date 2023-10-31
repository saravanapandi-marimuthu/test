using System.Linq.Expressions;
using Horizen.Core.Extensions;
using Horizen.Data.Context;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Companies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Horizen.Data.Services.RelatedCompanies.Inputs;
using Horizen.Data.Attributes;
using Horizen.Data.Services.Inputs;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using Horizen.Data.Domain.CompanyRelationships.Views;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.CompanyRelationships.Enums;
using Horizen.Data.Domain.Companies.Enums;
using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Services.RelatedCompanies;

[DataService]
public class RelatedCompanyService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<RelatedCompanyService> _logger;
    private readonly CompanyService _companyService;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public RelatedCompanyService(
        HorizenDbContext context,
        ILogger<RelatedCompanyService> logger,
        IAuthenticatedUserService authenticatedUserService,
        CompanyService companyService
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _companyService = companyService ?? throw new ArgumentNullException(nameof(companyService));
        _authenticatedUserService =
            authenticatedUserService
            ?? throw new ArgumentNullException(nameof(authenticatedUserService));
    }

    public async Task<Result<CompanyRelationship>> CreateRelatedCompanyAsync(
        CreateRelatedCompanyInput input
    )
    {
        if (
            (!input.RelatedCompanyId.HasValue || input.RelatedCompanyId == Guid.Empty)
            && string.IsNullOrWhiteSpace(input.RelatedCompanyName)
        )
        {
            return Result<CompanyRelationship>.Failure(
                "Either RelatedCompanyId or RelatedCompanyName must be provided"
            );
        }

        var createdBy =
            _authenticatedUserService.AuthenticatedUser?.User?.Id.ToString() ?? "System";

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var relatedCompany = default(Company);

            if (input.RelatedCompanyId.HasValue && input.RelatedCompanyId != Guid.Empty)
            {
                relatedCompany = await _companyService.GetCompanyByIdAsync(
                    input.RelatedCompanyId.Value
                );
            }
            else
            {
                relatedCompany = await _companyService.GetCompanyByNameAsync(
                    input.RelatedCompanyName ?? string.Empty
                );
            }

            if (relatedCompany == null)
            {
                return Result<CompanyRelationship>.Failure(
                    $"Related Company with Id {input.RelatedCompanyId} or Name {input.RelatedCompanyName} not found"
                );
            }

            var company = await _companyService.AddCompanyToContextAsync(input.Company);

            var companyRelationship = CreateRelatedCompany(
                company,
                relatedCompany,
                input.RelationshipType,
                input.Notes,
                input.TagLinks,
                createdBy
            );

            _context.CompanyRelationships.Add(companyRelationship);

            var result = await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return Result<CompanyRelationship>.Success(companyRelationship);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating company service");
            transaction.Rollback();
            return Result<CompanyRelationship>.Failure(ex.Message);
        }
    }

    public async Task<Result<CompanyRelationship?>> LinkCompaniesAsync(LinkCompaniesInput input)
    {
        if (input.PrimaryCompanyId == Guid.Empty || input.RelatedCompanyId == Guid.Empty)
        {
            return Result<CompanyRelationship?>.Failure(
                "PrimaryCompanyId and RelatedCompanyId must be provided"
            );
        }

        if (input.PrimaryCompanyId == input.RelatedCompanyId)
        {
            return Result<CompanyRelationship?>.Failure(
                "PrimaryCompanyId and RelatedCompanyId cannot be the same"
            );
        }

        var createdBy =
            _authenticatedUserService.AuthenticatedUser?.User?.Id.ToString() ?? "System";

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var companies = await _context.Companies
                .Where(c => c.Id == input.PrimaryCompanyId || c.Id == input.RelatedCompanyId)
                .ToListAsync();

            if (companies.Count != 2)
            {
                return Result<CompanyRelationship?>.Failure(
                    $"Companies with Ids {input.PrimaryCompanyId} and {input.RelatedCompanyId} not found"
                );
            }

            var firstCompany = companies.FirstOrDefault(c => c.Id == input.PrimaryCompanyId);
            var secondCompany = companies.FirstOrDefault(c => c.Id == input.RelatedCompanyId);

            // This should not happen, but still check
            if (firstCompany == null || secondCompany == null)
            {
                return Result<CompanyRelationship?>.Failure(
                    $"Companies with Ids {input.PrimaryCompanyId} and {input.RelatedCompanyId} not found"
                );
            }

            var companyRelationship = CreateRelatedCompany(
                firstCompany,
                secondCompany,
                input.RelationshipType,
                input.Notes,
                input.TagLinks,
                createdBy
            );

            _context.CompanyRelationships.Add(companyRelationship);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();
            return Result<CompanyRelationship?>.Success(companyRelationship);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return Result<CompanyRelationship?>.Failure(ex.Message);
        }
    }

    public async Task<Result<CollectionResult<RelatedCompanyView>>> GetRelatedCompaniesAsync(
        GetRelatedCompaniesInput input
    )
    {
        Expression<Func<CompanyRelationship, bool>> primaryPredicate;
        Expression<Func<CompanyRelationship, bool>> relatedPredicate;

        if (input.CompanyId.HasValue && input.CompanyId != Guid.Empty)
        {
            primaryPredicate = cr =>
                cr.PrimaryCompanyId == input.CompanyId
                && cr.CompanyRelationshipType == input.CompanyRelationshipType;
            relatedPredicate = cr =>
                cr.RelatedCompanyId == input.CompanyId
                && cr.CompanyRelationshipType == input.CompanyRelationshipType;
        }
        else if (!string.IsNullOrWhiteSpace(input.CompanyName))
        {
            var normalizedName = input.CompanyName.ToHorizenNormalizedString();
            primaryPredicate = cr =>
                cr.PrimaryCompany.NormalizedName == normalizedName
                && cr.CompanyRelationshipType == input.CompanyRelationshipType;
            relatedPredicate = cr =>
                cr.RelatedCompany.NormalizedName == normalizedName
                && cr.CompanyRelationshipType == input.CompanyRelationshipType;
        }
        else
        {
            return Result<CollectionResult<RelatedCompanyView>>.Failure(
                "Either CompanyId or CompanyName must be provided"
            );
        }

        var combined = await GetCompaniesByPredicate(input, primaryPredicate, relatedPredicate);

        var items = new CollectionResult<RelatedCompanyView>
        {
            Items = combined?.ToList() ?? new List<RelatedCompanyView>(),
            TotalCount = combined?.Count ?? 0,
        };

        return Result<CollectionResult<RelatedCompanyView>>.Success(items);
    }

    private CompanyRelationship CreateRelatedCompany(
        Company firstCompany,
        Company secondCompany,
        CompanyRelationshipType relationshipType,
        string? notes,
        ICollection<TagLinkInput> tagLinks,
        string createdBy
    )
    {
        var direction = GetCompanyRelationshipDirection(
            firstCompany.ServiceType,
            secondCompany.ServiceType,
            relationshipType
        );

        var companyRelationship = new CompanyRelationship
        {
            PrimaryCompanyId =
                direction == CompanyRelationshipDirection.PrimaryToRelated
                    ? firstCompany.Id
                    : secondCompany.Id,
            RelatedCompanyId =
                direction == CompanyRelationshipDirection.PrimaryToRelated
                    ? secondCompany.Id
                    : firstCompany.Id,
            CompanyRelationshipType = relationshipType,
            CompanyRelationshipStatus = CompanyRelationshipStatus.Active,
            Notes = notes,
            CreatedBy =
                _authenticatedUserService.AuthenticatedUser?.User?.Id.ToString() ?? "System",
        };

        foreach (var tagLinkInput in tagLinks)
        {
            _context.Tags
                .Where(
                    t =>
                        t.NormalizedName == tagLinkInput.TagName.ToHorizenNormalizedString()
                        && t.TagCategory.NormalizedName
                            == tagLinkInput.TagCategoryName.ToHorizenNormalizedString()
                )
                .ToList()
                .ForEach(t =>
                {
                    companyRelationship.CompanyRelationshipTags.Add(
                        new CompanyRelationshipTag { Tag = t, CreatedBy = createdBy, }
                    );
                });
        }

        return companyRelationship;
    }

    private async Task<ICollection<RelatedCompanyView>> GetCompaniesByPredicate(
        GetRelatedCompaniesInput input,
        Expression<Func<CompanyRelationship, bool>> primaryPredicate,
        Expression<Func<CompanyRelationship, bool>> relatedPredicate
    )
    {
        var primaryQuery = await _context.CompanyRelationships
            .Include(cr => cr.RelatedCompany)
            .Include(cr => cr.CompanyRelationshipTags)
            .ThenInclude(crt => crt.Tag)
            .ThenInclude(t => t.TagCategory)
            .Where(primaryPredicate)
            .Select(
                cr =>
                    new RelatedCompanyView
                    {
                        Company = cr.RelatedCompany,
                        CompanyRelationshipType = cr.CompanyRelationshipType,
                        CompanyRelationshipDirection =
                            CompanyRelationshipDirection.PrimaryToRelated,
                        CompanyRelationshipTags = cr.CompanyRelationshipTags,
                    }
            )
            .ToListAsync();

        var relatedQuery = await _context.CompanyRelationships
            .Include(cr => cr.PrimaryCompany)
            .Include(cr => cr.CompanyRelationshipTags)
            .ThenInclude(crt => crt.Tag)
            .ThenInclude(t => t.TagCategory)
            .Where(relatedPredicate)
            .Select(
                cr =>
                    new RelatedCompanyView
                    {
                        Company = cr.PrimaryCompany,
                        CompanyRelationshipType = cr.CompanyRelationshipType,
                        CompanyRelationshipDirection =
                            CompanyRelationshipDirection.RelatedToPrimary,
                        CompanyRelationshipTags = cr.CompanyRelationshipTags,
                    }
            )
            .ToListAsync();

        var combinedCompanies = primaryQuery.Concat(relatedQuery).ToList();

        // Fetch the roles separately
        var companyIds = combinedCompanies.Select(c => c.Company.Id).ToList();

        var companies =
            await _context.Companies
                .Include(c => c.CompanyTags)
                .Include(c => c.CompanyAddresses)
                .ThenInclude(ca => ca.Address)
                .Include(c => c.CompanyPhoneNumbers)
                .ThenInclude(cpn => cpn.PhoneNumber)
                .Include(c => c.UserRoles.Where(ur => ur.RoleType.HasFlag(RoleTypes.Contact)))
                .ThenInclude(ur => ur.User)
                .Where(c => companyIds.Contains(c.Id))
                .ToListAsync() ?? new List<Company>();

        foreach (var dto in combinedCompanies)
        {
            var company = companies.FirstOrDefault(c => c.Id == dto.Company.Id);

            if (company != null)
            {
                dto.Company = company;
            }
        }

        return combinedCompanies;
    }

    private static CompanyRelationshipDirection GetCompanyRelationshipDirection(
        CompanyServiceTypes firstCompanyServiceType,
        CompanyServiceTypes secondCompanyServiceType,
        CompanyRelationshipType companyRelationshipType
    )
    {
        var direction = CompanyRelationshipDirection.PrimaryToRelated;

        switch (companyRelationshipType)
        {
            case CompanyRelationshipType.Customer:
                if (firstCompanyServiceType.HasFlag(CompanyServiceTypes.Account))
                {
                    direction = CompanyRelationshipDirection.RelatedToPrimary;
                }

                break;

            case CompanyRelationshipType.EnterpriseOwner:
                if (firstCompanyServiceType.HasFlag(CompanyServiceTypes.Enterprise))
                {
                    direction = CompanyRelationshipDirection.RelatedToPrimary;
                }
                break;

            case CompanyRelationshipType.EnterpriseServiceProvider:
                if (firstCompanyServiceType.HasFlag(CompanyServiceTypes.Enterprise))
                {
                    direction = CompanyRelationshipDirection.RelatedToPrimary;
                }
                break;

            case CompanyRelationshipType.Partner:
                break;

            case CompanyRelationshipType.Supplier:
                if (secondCompanyServiceType.HasFlag(CompanyServiceTypes.AgRetailer))
                {
                    direction = CompanyRelationshipDirection.RelatedToPrimary;
                }
                break;

            case CompanyRelationshipType.Vendor:
                if (secondCompanyServiceType.HasFlag(CompanyServiceTypes.AgRetailer))
                {
                    direction = CompanyRelationshipDirection.RelatedToPrimary;
                }
                break;
        }

        return direction;
    }
}
