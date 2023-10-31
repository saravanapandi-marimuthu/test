using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Auth.Views;

namespace Horizen.WebApi.GraphQL.Auth;

public class AuthenticatedUserService : IAuthenticatedUserService
{
    public AuthenticatedUserService() { }

    public void SetAuthenticatedUser(AuthenticatedUserView authenticatedUser)
    {
        AuthenticatedUser = authenticatedUser;
    }

    public void SetSelectedUserRole(Guid selectedUserRole)
    {
        SelectedUserRoleId = selectedUserRole;
    }

    public AuthenticatedUserView? AuthenticatedUser { get; private set; }

    public Guid? SelectedUserRoleId { get; private set; }
}
