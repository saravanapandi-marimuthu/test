using Horizen.Core.Extensions;
using Microsoft.Extensions.Logging;
using Horizen.Data.Services.Users;
using Horizen.Data.Services.UserRoles;
using Microsoft.Extensions.Configuration;
using Horizen.Core.Utilities;
using Horizen.Data.Services.Companies;
using Horizen.Data.Services.Companies.Inputs;
using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Services.UserRoles.Inputs;
using Horizen.Data.Domain.Companies.Enums;
using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.DataSprout.Seeders;

public class UserRoleSeeder : ISeeder
{
    private ILogger<UserRoleSeeder> _logger;
    private readonly string _companySeedFile = "companies.json";
    private readonly UserRoleService _userRoleService;
    private readonly CompanyService _companyService;
    private readonly UserService _userService;
    private readonly string _dataPath;
    private readonly string _userSeedFile = "users.json";

    public UserRoleSeeder(
        ILogger<UserRoleSeeder> logger,
        IConfiguration configuration,
        UserRoleService userRoleService,
        CompanyService companyService,
        UserService userService
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _userRoleService =
            userRoleService ?? throw new ArgumentNullException(nameof(userRoleService));
        _companyService = companyService ?? throw new ArgumentNullException(nameof(companyService));
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));

        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding User Roles");

        var metadata = typeof(CompanyServiceTypes).GetEnumValuesWithMetadata<CompanyServiceTypes>();

        foreach (var (Value, Name, Description) in metadata)
        {
            Console.WriteLine($"Value: {Value}, Name: {Name}, Description: {Description}");
        }

        var companies = await JsonUtility.LoadFromFileAsync<ICollection<CreateCompanyInput>>(
            Path.Combine(_dataPath, _companySeedFile)
        );

        var horizenCompany =
            companies.FirstOrDefault(c => c.Name.StartsWith("Horizen"))
            ?? throw new Exception("Company Horizen not found");

        await AddRolesToCompany(horizenCompany, new List<RoleTypes> { RoleTypes.SuperAdmin }, true);

        var agHubCompany =
            companies.FirstOrDefault(c => c.Name.StartsWith("AgHub"))
            ?? throw new Exception("Company AgHub not found");

        await AddRolesToCompany(
            agHubCompany,
            new List<RoleTypes> { RoleTypes.SalesManager, RoleTypes.CompanyAdmin }
        );
    }

    private async Task AddRolesToCompany(
        CreateCompanyInput company,
        ICollection<RoleTypes> roleTypes,
        bool setAsSelectedRole = false
    )
    {
        var result =
            await _companyService.GetCompanyByNameAsync(company.Name)
            ?? throw new Exception($"Company {company.Name} not found");

        await AddUserRolesToCompanyAsync(result.Id, roleTypes, setAsSelectedRole);
    }

    private async Task AddUserRolesToCompanyAsync(
        Guid companyId,
        ICollection<RoleTypes> roles,
        bool setAsSelectedRole
    )
    {
        var users = await JsonUtility.LoadFromFileAsync<ICollection<CreateExternalUserInput>>(
            Path.Combine(_dataPath, _userSeedFile)
        );
        foreach (var user in users)
        {
            var result = await _userService.GetExternalUserAsync(user.ExternalUserId);

            if (result.IsFailure || result.Value == null)
            {
                _logger.LogWarning(result.ErrorMessage);
                throw new Exception(result.ErrorMessage);
            }

            var userRole = new AddUserRoleInput
            {
                CompanyId = companyId,
                UserId = result.Value.User.Id,
                RoleTypes = roles,
                SetAsSelectedRole = setAsSelectedRole,
            };

            var userRoleResult = await _userRoleService.AddUserRoleToCompanyAsync(userRole);

            if (userRoleResult.IsFailure)
            {
                _logger.LogWarning(userRoleResult.ErrorMessage);
            }
        }
    }
}
