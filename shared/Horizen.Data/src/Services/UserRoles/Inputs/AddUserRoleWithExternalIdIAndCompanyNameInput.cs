using Horizen.Data.Domain.UserRoles.Enums;

namespace Horizen.Data.Services.UserRoles.Inputs;

public class AddUserRoleWithExternalIdIAndCompanyNameInput
{
    public string ExternalUserId { get; set; } = "";

    public string CompanyName { get; set; } = "";

    public ICollection<RoleTypes> RoleTypes { get; set; } = new List<RoleTypes>();
}
