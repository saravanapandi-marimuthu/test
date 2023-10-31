using Horizen.Core.Extensions;
using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Domain.Auth.Views;
using Horizen.Data.Domain.UserRoles.Entities;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Horizen.Data.Services.Users;

[DataService]
public class UserService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<UserService> _logger;

    public UserService(HorizenDbContext context, ILogger<UserService> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<Result<ExternalUser>> GetExternalUserAsync(string externalUserId)
    {
        _logger.LogInformation($"GetExternalUserAsync: {externalUserId}");

        var user = await _context.ExternalUsers
            .Include(x => x.User)
            .ThenInclude(x => x.UserRoles)
            .FirstOrDefaultAsync(x => x.ExternalUserId == externalUserId);

        if (user == null)
        {
            _logger.LogInformation($"GetExternalUserAsync: {externalUserId} not found");
            return Result<ExternalUser>.Failure($"External user {externalUserId} not found");
        }

        return Result<ExternalUser>.Success(user);
    }

    public async Task<Result<AuthenticatedUserView>> GetAuthenticatedUserViewAsync(
        string externalUserId
    )
    {
        _logger.LogInformation($"GetExternalUserAsync: {externalUserId}");

        var user = await _context.ExternalUsers
            .Where(x => x.ExternalUserId == externalUserId)
            .Select(
                x =>
                    new AuthenticatedUserView
                    {
                        ExternalUserId = x.ExternalUserId,
                        User = new UserView
                        {
                            Id = x.User.Id,
                            Email = x.User.Email,
                            SelectedUserRoleId = x.User.SelectedUserRoleId,
                            UserRoles = x.User.UserRoles
                                .Select(
                                    ur =>
                                        new UserRoleView
                                        {
                                            Id = ur.Id,
                                            RoleType = ur.RoleType,
                                            CompanyId = ur.CompanyId
                                        }
                                )
                                .ToList()
                        }
                    }
            )
            .FirstOrDefaultAsync();

        if (user == null)
        {
            _logger.LogInformation($"GetExternalUserAsync: {externalUserId} not found");
            return Result<AuthenticatedUserView>.Failure(
                $"External user {externalUserId} not found"
            );
        }

        return Result<AuthenticatedUserView>.Success(user);
    }

    public async Task<Result<ExternalUser>> CreateExternalUserAsync(CreateExternalUserInput input)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            User user = CreateUser(input);

            var externalUser = new ExternalUser
            {
                ExternalUserId = input.ExternalUserId,
                Provider = input.Provider,
                User = user,
                CreatedBy = "System",
            };

            await _context.ExternalUsers.AddAsync(externalUser);

            // Find it there is an UserInvite for this email address
            var userInvite = await _context.UserInvites.FirstOrDefaultAsync(
                x => x.Email == input.Email
            );

            if (userInvite != null)
            {
                userInvite.RedeemedAt = DateTime.UtcNow;
                // Add a role attaching the user to the company
                var userRole = new UserRole
                {
                    RoleType = userInvite.Role,
                    CompanyId = userInvite.CompanyId,
                    User = user,
                    CreatedBy = "System",
                };

                await _context.UserRoles.AddAsync(userRole);
            }

            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return Result<ExternalUser>.Success(externalUser);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error creating external user");
            await transaction.RollbackAsync();
            return Result<ExternalUser>.Failure(e.Message);
        }
    }

    internal User CreateUser(CreateUserInput input)
    {
        var user = input.ToUser();

        input.Addresses
            .ToList()
            .ForEach(a =>
            {
                user.UserAddresses.Add(
                    new UserAddress
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
                user.UserPhoneNumbers.Add(
                    new UserPhoneNumber
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
                    user.UserTags.Add(new UserTag { Tag = t, CreatedBy = "System", });
                });
        }

        return user;
    }

    public ValueTask<User?> GetUserByIdAsync(Guid userId)
    {
        return _context.Users.FindAsync(userId);
    }

    public async Task SetSelectedUserRoleIdAsync(Guid id, Guid selectedRoleId)
    {
        var user = _context.Users.FirstOrDefault(x => x.Id == id);

        if (user != null && user.SelectedUserRoleId != selectedRoleId)
        {
            user.SelectedUserRoleId = selectedRoleId;
            await _context.SaveChangesAsync();
        }
    }

    public async Task<Result<CollectionResult<User>>> GetUsersAsync(GetUsersInput input)
    {
        var query = _context.Users.AsQueryable();

        if (!string.IsNullOrWhiteSpace(input.NormalizedSearchTerm))
        {
            if (input.NormalizedSearchTerm.Contains("@"))
            {
                query = query.Where(t => t.Email == input.NormalizedSearchTerm);
            }
            else
            {
                query = query.Where(
                    t =>
                        t.FirstName != null
                            && t.FirstName.ToLower().Contains(input.NormalizedSearchTerm.ToLower())
                        || (
                            t.LastName != null
                            && t.LastName.ToLower().Contains(input.NormalizedSearchTerm.ToLower())
                        )
                );
            }
        }

        var totalCount = await query.CountAsync();

        query = query.Include(x => x.UserRoles).ThenInclude(x => x.Company);

        if (!string.IsNullOrWhiteSpace(input.SortBy))
        {
            query = query.OrderBy(input.SortBy, input.SortDesc ?? false);
        }

        query = query.Skip(input.Skip).Take(input.GetPageSize());

        var list = await query.ToListAsync();

        return Result<CollectionResult<User>>.Success(
            new CollectionResult<User> { Items = list, TotalCount = totalCount, }
        );
    }

    public async Task<Result<User>> GetUserAsync(GetUserInput input)
    {
        var query = _context.Users.AsQueryable();

        if (input.Id.HasValue)
        {
            query = query.Where(x => x.Id == input.Id.Value);
        }
        else if (!string.IsNullOrWhiteSpace(input.Email))
        {
            query = query.Where(x => x.NormalizedEmail == input.Email.ToHorizenNormalizedString());
        }
        else
        {
            return Result<User>.Failure($"Invalid input. Either 'email' or 'id' must be provided");
        }

        query = query.Include(x => x.UserRoles).ThenInclude(x => x.Company);

        var user = await query.FirstOrDefaultAsync();

        return Result<User>.Success(user);
    }

    internal async Task<User?> GetUserIfExistsAsync(string email)
    {
        var user = await _context.Users
            .Where(x => x.Email == email.ToHorizenNormalizedString())
            .Include(x => x.UserRoles)
            .FirstOrDefaultAsync();

        return user;
    }

    public async Task<Result<CollectionResult<UserInvite>>> InviteUsersAsync(InviteUsersInput input)
    {
        // Create UserInvite for each InviteUserInput and add to context
        var invites = new List<UserInvite>();

        foreach (var inviteUserInput in input.Users)
        {
            var userInvite = new UserInvite
            {
                Email = inviteUserInput.Email,
                Role = inviteUserInput.Role,
                CompanyId = inviteUserInput.CompanyId,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                Token = Guid.NewGuid().ToString(),
            };

            _context.UserInvites.Add(userInvite);
            invites.Add(userInvite);
        }

        await _context.SaveChangesAsync();

        return Result<CollectionResult<UserInvite>>.Success(
            new CollectionResult<UserInvite> { Items = invites, TotalCount = invites.Count, }
        );
    }
}
