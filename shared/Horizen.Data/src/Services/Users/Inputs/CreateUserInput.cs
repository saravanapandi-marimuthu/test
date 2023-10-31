using Horizen.Core.Extensions;
using Horizen.Data.Services.Inputs;
using Horizen.Data.Domain.Users.Entities;

namespace Horizen.Data.Services.Users.Inputs;

public class CreateUserInput
{
    public string Email { get; set; } = "";
    public string DisplayName { get; set; } = "";
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string? LastName { get; set; }
    public string? Notes { get; set; } = "";

    public ICollection<CreatePhoneNumberWithTypeInput> PhoneNumbers { get; set; } =
        new List<CreatePhoneNumberWithTypeInput>();

    public ICollection<CreateAddressWithTypeInput> Addresses { get; set; } =
        new List<CreateAddressWithTypeInput>();

    public ICollection<TagLinkInput> TagLinks { get; set; } = new List<TagLinkInput>();

    public User ToUser()
    {
        return new User
        {
            NormalizedEmail = Email.ToHorizenNormalizedString(),
            Email = Email,
            DisplayName = DisplayName,
            FirstName = FirstName,
            MiddleName = MiddleName,
            LastName = LastName,
            Notes = Notes,
            UserSettings = new UserSettings { CreatedBy = "System", },
            CreatedBy = "System",
        };
    }
}
