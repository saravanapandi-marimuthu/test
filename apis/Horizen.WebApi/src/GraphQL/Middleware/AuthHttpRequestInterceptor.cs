using System.Security.Claims;
using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Services.Users;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Auth.Views;

namespace Horizen.WebApi.GraphQL.Middleware;

public class AuthHttpRequestInterceptor : DefaultHttpRequestInterceptor
{
    private readonly ILogger<AuthHttpRequestInterceptor> _logger;
    private readonly IServiceProvider _serviceProvider;

    private static readonly string HorizenRoleHeader = "X-Horizen-Role";
    private static readonly string EmailsClaim = "emails";
    private static readonly string IdentityProviderClaim =
        "http://schemas.microsoft.com/identity/claims/identityprovider";
    private static readonly string NameClaim = "name";

    public AuthHttpRequestInterceptor(
        ILogger<AuthHttpRequestInterceptor> logger,
        [Service] IServiceProvider serviceProvider
    )
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public override async ValueTask OnCreateAsync(
        HttpContext context,
        IRequestExecutor requestExecutor,
        IQueryRequestBuilder requestBuilder,
        CancellationToken cancellationToken
    )
    {
        await AuthenticateUserAsync(context, requestBuilder, cancellationToken);
        await base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);
    }

    private async ValueTask AuthenticateUserAsync(
        HttpContext context,
        IQueryRequestBuilder requestBuilder,
        CancellationToken cancellationToken
    )
    {
        var user = context.User;

        // KALYAN'S NOTE: requestBuilder.SetGlobalState(Key, Value) is a way to pass data to the resolvers. But we need access to
        // authenticated users in the data layer for auditing purposes. So we will use the IAuthenticatedUserService instead.

        if (!user?.Identity?.IsAuthenticated ?? true)
        {
            _logger.LogInformation("User is not authenticated");
            return;
        }

        _logger.LogInformation($"User is authenticated: {user!.Identity!.Name}");

        //user?.Claims.ToList().ForEach(x => Console.WriteLine($"{x.Type} - {x.Value}"));

        var userId = user!.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
        {
            var message = "User id is null";
            _logger.LogError(message);
            throw new Exception(message);
        }

        using var scope = _serviceProvider.CreateScope();
        var userService = scope.ServiceProvider.GetRequiredService<UserService>();
        var result = await userService.GetAuthenticatedUserViewAsync(userId);

        var authenticatedUserService =
            scope.ServiceProvider.GetRequiredService<IAuthenticatedUserService>();

        var externalUser = result.Value;

        if (externalUser == null)
        {
            _logger.LogError($"External User {userId} not found. Adding to the system.");

            externalUser = await AddExternalUserToSystemAsync(userService, userId, user);
        }

        authenticatedUserService.SetAuthenticatedUser(externalUser);

        await ProcessUserRoleAsync(
            context,
            externalUser.User,
            userService,
            authenticatedUserService
        );
    }

    private async Task ProcessUserRoleAsync(
        HttpContext context,
        UserView user,
        UserService userService,
        IAuthenticatedUserService authenticatedUserService
    )
    {
        if (!user.UserRoles.Any())
        {
            _logger.LogInformation($"User {user.Id} has no roles");

            return;
        }

        if (!context.Request.Headers.TryGetValue(HorizenRoleHeader, out var selectedRole))
        {
            return;
        }

        Guid.TryParse(selectedRole[0], out var selectedRoleId);

        if (selectedRoleId.Equals(Guid.Empty))
        {
            if (
                user.SelectedUserRoleId.HasValue
                && user.UserRoles.Any(x => x.Id == user.SelectedUserRoleId)
            )
            {
                selectedRoleId = user.SelectedUserRoleId.Value;
            }
            else
            {
                selectedRoleId = user.UserRoles.First().Id;
            }
        }

        if (!user.UserRoles.Any(x => x.Id == selectedRoleId))
        {
            // If we are here, it means that the user has no roles in the system.
            return;
        }

        await userService.SetSelectedUserRoleIdAsync(user.Id, selectedRoleId);
        authenticatedUserService.SetSelectedUserRole(selectedRoleId);
    }

    private async Task<AuthenticatedUserView> AddExternalUserToSystemAsync(
        UserService userService,
        string userId,
        ClaimsPrincipal user
    )
    {
        // NOTE: Azure B2C returns email as a claim type of "emails" instead of "ClaimTypes.Email"
        var email = user.FindFirst(EmailsClaim)?.Value;

        if (email == null)
        {
            var message = "Email is null. Cannot create user.";
            _logger.LogError(message);
            throw new Exception(message);
        }

        var firstName = user.FindFirst(ClaimTypes.GivenName)?.Value;
        var lastName = user.FindFirst(ClaimTypes.Surname)?.Value;
        var displayName = user.FindFirst(NameClaim)?.Value;

        var input = new CreateExternalUserInput
        {
            ExternalUserId = userId,
            Provider = user.FindFirst(IdentityProviderClaim)?.Value ?? "",
            Email = email,
            DisplayName = displayName ?? "",
            FirstName = firstName,
            LastName = lastName,
            Notes = "Created by system"
        };

        var result = await userService.CreateExternalUserAsync(input);

        if (!result.IsSuccess || result.Value == null)
        {
            var message = result.IsFailure ? result.ErrorMessage : "Error creating user";

            _logger.LogError(message);
            throw new Exception(message);
        }

        var authenticatedUser = await userService.GetAuthenticatedUserViewAsync(userId);

        if (authenticatedUser.IsFailure || authenticatedUser.Value == null)
        {
            var message = authenticatedUser.IsFailure
                ? authenticatedUser.ErrorMessage
                : "Error getting authenticated user";

            _logger.LogError(message);
            throw new Exception(message);
        }

        return authenticatedUser.Value;
    }
}
