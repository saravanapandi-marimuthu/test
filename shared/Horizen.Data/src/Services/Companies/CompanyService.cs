using Horizen.Data.Context;
using Horizen.Data.Errors;
using Horizen.Core.Extensions;
using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Horizen.Data.Attributes;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Companies.Enums;
using Horizen.Data.Domain.UserRoles.Entities;
using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Services.Companies;

[DataService]
public class CompanyService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<CompanyService> _logger;
    private readonly UserService _userService;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public CompanyService(
        HorizenDbContext context,
        ILogger<CompanyService> logger,
        UserService userService,
        IAuthenticatedUserService authenticatedUserService
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        _authenticatedUserService =
            authenticatedUserService
            ?? throw new ArgumentNullException(nameof(authenticatedUserService));
    }

    public async Task<Result<Company>> CreateCompanyAsync(CreateCompanyInput input)
    {
        using var transaction = _context.Database.BeginTransaction();

        try
        {
            Company company = await AddCompanyToContextAsync(input);

            _context.SaveChanges();

            transaction.Commit();

            return Result<Company>.Success(company);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating company service");
            transaction.Rollback();
            return Result<Company>.Failure(ex.Message);
        }
    }

    public ValueTask<Company?> GetCompanyByIdAsync(Guid companyId)
    {
        return _context.Companies.FindAsync(companyId);
    }

    public Task<Company?> GetCompanyByNameAsync(string name)
    {
        return _context.Companies.FirstOrDefaultAsync(
            c => c.NormalizedName == name.ToHorizenNormalizedString()
        );
    }

    public async Task<Result<Company>> GetCompanyAsync(GetCompanyInput input)
    {
        if (
            (input.CompanyId == null || input.CompanyId == Guid.Empty)
            && string.IsNullOrWhiteSpace(input.CompanyName)
        )
        {
            return Result<Company>.Failure("Either CompanyId or CompanyName must be provided");
        }

        var companyName = input.CompanyName?.ToHorizenNormalizedString() ?? string.Empty;

        var company = await _context.Companies
            .Include(c => c.CompanyAddresses)
            .ThenInclude(ca => ca.Address)
            .Include(c => c.CompanyPhoneNumbers)
            .ThenInclude(cpn => cpn.PhoneNumber)
            .Include(c => c.UserRoles.Where(ur => ur.RoleType.HasFlag(RoleTypes.Contact)))
            .ThenInclude(ur => ur.User)
            .Where(
                c =>
                    input.CompanyId.HasValue && input.CompanyId != Guid.Empty
                        ? c.Id == input.CompanyId
                        : c.NormalizedName == companyName
            )
            .FirstOrDefaultAsync();

        if (company == null)
        {
            return Result<Company>.Failure(
                $"Company with Id {input.CompanyId}/{input.CompanyName} not found"
            );
        }

        return Result<Company>.Success(company);
    }

    public async Task<Result<CollectionResult<Company>>> GetCompaniesAsync(GetCompaniesInput input)
    {
        var query = _context.Companies.AsQueryable();

        if (!string.IsNullOrWhiteSpace(input.NormalizedSearchTerm))
        {
            query = query.Where(t => t.NormalizedName.Contains(input.NormalizedSearchTerm));
        }

        if (input.ServiceTypes?.Any() == true)
        {
            // Get service types by doing an bitwise OR on input.ServiceTypes
            var serviceTypes = input.ServiceTypes.Aggregate(
                (CompanyServiceTypes)0,
                (current, serviceType) => current | serviceType
            );

            query = query.Where(c => (c.ServiceType & serviceTypes) != 0);
        }

        var totalCount = await query.CountAsync();

        query = query
            .Include(c => c.UserRoles.Where(ur => ur.RoleType.HasFlag(RoleTypes.Contact)))
            .ThenInclude(ur => ur.User)
            .Include(c => c.CompanyAddresses)
            .ThenInclude(ca => ca.Address)
            .Include(c => c.CompanyPhoneNumbers)
            .ThenInclude(cp => cp.PhoneNumber);

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<Company>>.Success(
            new CollectionResult<Company> { Items = list, TotalCount = totalCount, }
        );
    }

    public async Task<Result<CollectionResult<Company>>> GetCompanyWithSubsidiariesAsync(
        GetCompanyWithSubsidiariesInput input
    )
    {
        if (input.CompanyId == Guid.Empty)
        {
            return Result<CollectionResult<Company>>.Failure("CompanyId must be provided");
        }

        var query = _context.Companies.AsQueryable();

        query = query.Where(c => c.Id == input.CompanyId || c.ParentCompanyId == input.CompanyId);

        if (!string.IsNullOrWhiteSpace(input.NormalizedSearchTerm))
        {
            query = query.Where(t => t.NormalizedName.Contains(input.NormalizedSearchTerm));
        }

        var totalCount = await query.CountAsync();

        query = query
            .Include(c => c.UserRoles.Where(ur => ur.RoleType.HasFlag(RoleTypes.Contact)))
            .ThenInclude(ur => ur.User)
            .Include(c => c.CompanyAddresses)
            .ThenInclude(ca => ca.Address)
            .Include(c => c.CompanyPhoneNumbers)
            .ThenInclude(cp => cp.PhoneNumber);

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<Company>>.Success(
            new CollectionResult<Company> { Items = list, TotalCount = totalCount, }
        );
    }

    internal async Task<Company> AddCompanyToContextAsync(CreateCompanyInput input)
    {
        if (_context.Companies.Any(c => c.NormalizedName == input.Name.ToHorizenNormalizedString()))
        {
            throw new EntityAlreadyExistsException(
                $"Company with name {input.Name} already exists"
            );
        }

        var company = new Company
        {
            NormalizedName = input.Name.ToHorizenNormalizedString(),
            Name = input.Name,
            ShortName = input.ShortName ?? input.Name,
            ExternalId = input.ExternalId,
            HomepageUrl = input.HomepageUrl,
            ParentCompanyId = input.ParentCompanyId,
            ExtendedProperties = input.ExtendedProperties ?? new CompanyExtendedProperties(),
            CreatedBy = "System",
        };

        if (input.CompanyId.HasValue && input.CompanyId != Guid.Empty)
        {
            company.Id = input.CompanyId.Value;
        }

        company.Services = input.Services;

        input.Addresses
            .ToList()
            .ForEach(a =>
            {
                company.CompanyAddresses.Add(
                    new CompanyAddress
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
                company.CompanyPhoneNumbers.Add(
                    new CompanyPhoneNumber
                    {
                        PhoneNumberType = p.PhoneNumberType,
                        PhoneNumber = p.PhoneNumber.ToPhoneNumber(),
                        CreatedBy = "System",
                    }
                );
            });

        foreach (var tagLinkInput in input.TagLinks)
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
                    _logger.LogInformation($"Adding tag {t.Name} to company {company.Name}");

                    company.CompanyTags.Add(new CompanyTag { Tag = t, CreatedBy = "System", });
                });
        }

        await AddContactPersonAsync(input, company);

        _context.Companies.Add(company);
        return company;
    }

    private async Task AddContactPersonAsync(CreateCompanyInput input, Company company)
    {
        // Check if contact person already exists
        if (input.ContactPerson == null)
        {
            return;
        }

        var contactPerson = await _userService.GetUserIfExistsAsync(input.ContactPerson.Email);

        bool existingUser = contactPerson != null;

        if (!existingUser)
        {
            contactPerson = _userService.CreateUser(input.ContactPerson);
        }

        if (contactPerson == null)
        {
            throw new EntityAlreadyExistsException(
                $"Error creating Contact person with email {input.ContactPerson.Email}"
            );
        }

        if (existingUser)
        {
            var userRole = new UserRole
            {
                UserId = contactPerson.Id,
                CompanyId = company.Id,
                RoleType = RoleTypes.Contact,
                CreatedBy = "System",
            };

            _context.UserRoles.Add(userRole);
        }
        else
        {
            contactPerson.UserRoles.Add(
                new UserRole
                {
                    RoleType = RoleTypes.Contact,
                    CompanyId = company.Id,
                    CreatedBy = "System",
                }
            );
            _context.Users.Add(contactPerson);
        }
    }
}
