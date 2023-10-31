using Horizen.Core.Extensions;
using Microsoft.Extensions.Logging;
using Horizen.Data.Services.Users;
using Microsoft.Extensions.Configuration;
using Horizen.Data.Services.Users.Inputs;
using Horizen.Core.Utilities;
using Horizen.Data.Domain.Companies.Enums;

namespace Horizen.DataSprout.Seeders;

public class UserSeeder : ISeeder
{
    private ILogger<UserSeeder> _logger;
    private UserService _userService;
    private string _dataPath;
    private const string _userSeedFile = "users.json";

    public UserSeeder(
        ILogger<UserSeeder> logger,
        UserService userService,
        IConfiguration configuration
    )
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Users");

        var metadata = typeof(CompanyServiceTypes).GetEnumValuesWithMetadata<CompanyServiceTypes>();

        foreach (var (Value, Name, Description) in metadata)
        {
            Console.WriteLine($"Value: {Value}, Name: {Name}, Description: {Description}");
        }

        // Load users from json file
        var users = await JsonUtility.LoadFromFileAsync<ICollection<CreateExternalUserInput>>(
            Path.Combine(_dataPath, _userSeedFile)
        );

        foreach (var user in users)
        {
            var result = await _userService.CreateExternalUserAsync(user);

            if (result.IsFailure)
            {
                _logger.LogWarning(result.ErrorMessage);
            }
            else
            {
                _logger.LogInformation($"Created user {user.DisplayName}");
            }
        }
    }
}
