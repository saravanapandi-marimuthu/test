using Horizen.Data.Domain.Auth.Views;

namespace Horizen.Data.Domain.Auth.Services;

public interface IAuthenticatedUserService
{
    void SetAuthenticatedUser(AuthenticatedUserView authenticatedUser);

    void SetSelectedUserRole(Guid selectedUserRole);

    AuthenticatedUserView? AuthenticatedUser { get; }

    Guid? SelectedUserRoleId { get; }
}
