using Horizen.Data.Context;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Users;
using Horizen.Data.Services.UserRoles.Inputs;
using Microsoft.EntityFrameworkCore;
using Horizen.Data.Attributes;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Users.Entities;
using Horizen.Data.Domain.UserRoles.Entities;
using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Services.UserRoles;

[DataService]
public class UserRoleService
{
    private readonly HorizenDbContext _dbContext;
    private readonly CompanyService _companyService;
    private readonly UserService _userService;

    public UserRoleService(
        HorizenDbContext dbContext,
        CompanyService companyService,
        UserService userService
    )
    {
        _dbContext = dbContext;
        _companyService = companyService;
        _userService = userService;
    }

    public async Task<Result> AddUserRoleToCompanyAsync(
        AddUserRoleInput input,
        Guid? addedBy = null
    )
    {
        var user = await _userService.GetUserByIdAsync(input.UserId);

        if (user == null)
        {
            return Result.Failure("User not found");
        }

        var company = await _companyService.GetCompanyByIdAsync(input.CompanyId);
        if (company == null)
        {
            return Result.Failure("Company not found");
        }

        return await AddUserRoleAsync(addedBy, company, user, input.RoleTypes);
    }

    public async Task<Result> AddUserRoleToCompanyWithExternalUserIdAndCompanyNameAsync(
        AddUserRoleWithExternalIdIAndCompanyNameInput input,
        Guid? addedBy = null
    )
    {
        var externalUserResult = await _userService.GetExternalUserAsync(input.ExternalUserId);

        if (
            externalUserResult.IsFailure
            || externalUserResult.Value == null
            || externalUserResult.Value.User == null
        )
        {
            return Result.Failure("User not found");
        }

        var company = await _companyService.GetCompanyByNameAsync(input.CompanyName);

        if (company == null)
        {
            return Result.Failure("Company not found");
        }

        var user = externalUserResult.Value.User;

        return await AddUserRoleAsync(addedBy, company, user, input.RoleTypes);
    }

    public async Task<Result> RemoveUserRolesFromCompanyAsync(RemoveUserRoleInput input)
    {
        var user = await _userService.GetUserByIdAsync(input.UserId);
        if (user == null)
        {
            return Result.Failure("User not found");
        }

        var company = await _companyService.GetCompanyByIdAsync(input.CompanyId);
        if (company == null)
        {
            return Result.Failure("Company not found");
        }

        var userRole = await _dbContext.UserRoles.FirstOrDefaultAsync(
            x => x.UserId == user.Id && x.CompanyId == company.Id
        );

        if (userRole == null)
        {
            return Result.Failure("User role not found");
        }

        userRole.RoleType &= ~input.RoleType;

        await _dbContext.SaveChangesAsync();

        return Result.Success();
    }

    private async Task<Result> AddUserRoleAsync(
        Guid? addedBy,
        Company company,
        User user,
        ICollection<RoleTypes> roleTypes
    )
    {
        var roleType = roleTypes.Aggregate((x, y) => x | y);

        var existingUserRole = await _dbContext.UserRoles.FirstOrDefaultAsync(
            x => x.UserId == user.Id && x.CompanyId == company.Id
        );

        if (existingUserRole != null)
        {
            if (existingUserRole.RoleType.HasFlag(roleType))
            {
                return Result.Failure("User role already exists");
            }

            existingUserRole.RoleType |= roleType;
            await _dbContext.SaveChangesAsync();
        }
        else
        {
            var userRole = new UserRole
            {
                UserId = user.Id,
                CompanyId = company.Id,
                RoleType = roleType,
                CreatedBy = addedBy?.ToString() ?? "System",
            };

            await _dbContext.UserRoles.AddAsync(userRole);
            await _dbContext.SaveChangesAsync();
        }

        return Result.Success();
    }
}
