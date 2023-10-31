using Horizen.Data.Services.Inputs;
using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.Companies.Enums;

namespace Horizen.Data.Services.Companies.Inputs;

public class CreateCompanyInput
{
    public Guid? CompanyId { get; set; }
    public string Name { get; set; } = null!;
    public string? HomepageUrl { get; set; }
    public string? ExternalId { get; set; }
    public string? ShortName { get; set; }
    public Guid? ParentCompanyId { get; set; }
    public CompanyExtendedProperties? ExtendedProperties { get; set; }
    public ICollection<CompanyServiceTypes> Services { get; set; } =
        new List<CompanyServiceTypes>();

    public ICollection<CreateAddressWithTypeInput> Addresses { get; set; } =
        new List<CreateAddressWithTypeInput>();

    public ICollection<CreatePhoneNumberWithTypeInput> PhoneNumbers { get; set; } =
        new List<CreatePhoneNumberWithTypeInput>();

    public ICollection<TagLinkInput> TagLinks { get; set; } = new List<TagLinkInput>();

    public CreateUserInput? ContactPerson { get; set; } = null!;
}
