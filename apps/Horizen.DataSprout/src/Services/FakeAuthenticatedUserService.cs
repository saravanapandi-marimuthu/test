using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Auth.Views;

public class FakeAuthenticatedUserService : IAuthenticatedUserService
{
    public AuthenticatedUserView? AuthenticatedUser => new AuthenticatedUserView();

    public Guid? SelectedUserRoleId => Guid.Empty;

    public void SetAuthenticatedUser(AuthenticatedUserView authenticatedUser) { }

    public void SetSelectedUserRole(Guid selectedUserRole) { }
}
