using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Common.Enums;

namespace Horizen.Data.Services.Inputs;

public class CreatePhoneNumberWithTypeInput
{
    public PhoneNumberType PhoneNumberType { get; set; } = PhoneNumberType.Work;
    public CreatePhoneNumberInput PhoneNumber { get; set; } = new CreatePhoneNumberInput();
}

public class CreatePhoneNumberInput
{
    public string MainNumber { get; set; } = null!;
    public string? Extension { get; set; }

    public PhoneNumber ToPhoneNumber()
    {
        return new PhoneNumber { MainNumber = MainNumber, Extension = Extension };
    }
}

public class UpdatePhoneNumberWithTypeInput
{
    public int PhoneNumberId { get; set; }
    public PhoneNumberType PhoneNumberType { get; set; } = PhoneNumberType.Work;

    public UpdatePhoneNumberInput PhoneNumber { get; set; } = new UpdatePhoneNumberInput();
}

public class UpdatePhoneNumberInput : CreatePhoneNumberInput
{
    public int Id { get; set; }
}
