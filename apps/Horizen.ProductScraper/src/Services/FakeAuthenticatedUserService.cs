using Horizen.Data.Views.Users;

public class FakeAuthenticatedUserService : IAuthenticatedUserService
{
    public AuthenticatedUserView? AuthenticatedUser => new AuthenticatedUserView();

    public Guid? SelectedUserRoleId => Guid.Empty;

    public void SetAuthenticatedUser(AuthenticatedUserView authenticatedUser) { }

    public void SetSelectedUserRole(Guid selectedUserRole) { }
}
