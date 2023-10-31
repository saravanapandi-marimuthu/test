using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Horizen.Data.Services.Results;
using Horizen.Data.Services.Users.Inputs;
using Horizen.Data.Domain.Auth.Services;
using Horizen.Data.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Horizen.Data.Services.Users;

[DataService]
public class LoggedInUserService
{
    private readonly HorizenDbContext _context;
    private readonly ILogger<LoggedInUserService> _logger;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public LoggedInUserService(
        HorizenDbContext context,
        ILogger<LoggedInUserService> logger,
        IAuthenticatedUserService authenticatedUserService
    )
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _authenticatedUserService =
            authenticatedUserService
            ?? throw new ArgumentNullException(nameof(authenticatedUserService));
    }

    public async Task<Result<User>> GetUserAsync(Guid userId)
    {
        _logger.LogInformation($"{nameof(GetUserAsync)}: {userId}");

        var user = await _context.Users
            .Include(x => x.SelectedUserRole)
            .ThenInclude(x => x!.Company)
            .Include(x => x.UserSettings)
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Company)
            .Include(x => x.UserAddresses)
            .ThenInclude(x => x.Address)
            .Include(x => x.UserPhoneNumbers)
            .ThenInclude(x => x.PhoneNumber)
            .Include(x => x.UserTags)
            .ThenInclude(x => x.Tag)
            .FirstOrDefaultAsync(x => x.Id == userId);

        if (user == null)
        {
            _logger.LogInformation($"{nameof(GetUserAsync)}: {userId} not found");
            return Result<User>.Failure($"User not found");
        }

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> CreateUserAddressAsync(CreateUserAddressInput input)
    {
        _logger.LogInformation($"{nameof(CreateUserAddressAsync)}: {input.UserId}");

        var user = await _context.Users
            .Include(x => x.UserAddresses)
            .ThenInclude(x => x.Address)
            .FirstOrDefaultAsync(x => x.Id == input.UserId);

        if (user == null)
        {
            _logger.LogInformation($"{nameof(CreateUserAddressAsync)}: {input.UserId} not found");
            return Result<User>.Failure($"User not found");
        }

        var address = input.Address.ToAddress();

        var userAddress = new UserAddress { Address = address, AddressType = input.AddressType };

        user.UserAddresses.Add(userAddress);

        await _context.SaveChangesAsync();

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> UpdateUserAddressAsync(UpdateUserAddressInput input)
    {
        _logger.LogInformation($"{nameof(UpdateUserAddressAsync)} {input.UserId}");

        var user = await _context.Users
            .Include(x => x.UserAddresses)
            .ThenInclude(x => x.Address)
            .FirstOrDefaultAsync(x => x.Id == input.UserId);

        if (user == null)
        {
            _logger.LogInformation($"{nameof(UpdateUserAddressAsync)}: {input.UserId} not found");
            return Result<User>.Failure($"User not found");
        }

        var address = await _context.Addresses.FirstOrDefaultAsync(x => x.Id == input.AddressId);

        if (address == null)
        {
            _logger.LogInformation(
                $"{nameof(UpdateUserAddressAsync)}: {input.AddressId} not found"
            );
            return Result<User>.Failure($"Address not found");
        }

        var userAddress = user.UserAddresses.FirstOrDefault(x => x.AddressId == input.AddressId);

        if (userAddress == null)
        {
            _logger.LogInformation(
                $"{nameof(UpdateUserAddressAsync)}: {input.AddressId} not found"
            );
            return Result<User>.Failure($"Address not found");
        }

        userAddress.AddressType = input.AddressType;
        userAddress.Address.AddressLine1 = input.Address.AddressLine1;
        userAddress.Address.AddressLine2 = input.Address.AddressLine2;
        userAddress.Address.City = input.Address.City;
        userAddress.Address.State = input.Address.State;
        userAddress.Address.PostalCode = input.Address.PostalCode;
        userAddress.Address.Country = input.Address.Country;

        await _context.SaveChangesAsync();

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> DeleteUserAddressAsync(DeleteUserAddressInput input)
    {
        _logger.LogInformation($"{nameof(DeleteUserAddressAsync)} {input.UserId}");

        var user = await _context.Users
            .Include(x => x.UserAddresses)
            .ThenInclude(x => x.Address)
            .FirstOrDefaultAsync(x => x.Id == input.UserId);

        if (user == null)
        {
            _logger.LogInformation($"{nameof(DeleteUserAddressAsync)}: {input.UserId} not found");
            return Result<User>.Failure($"User not found");
        }

        var address = await _context.Addresses.FirstOrDefaultAsync(x => x.Id == input.AddressId);

        if (address == null)
        {
            _logger.LogInformation(
                $"{nameof(DeleteUserAddressAsync)}: {input.AddressId} not found"
            );

            return Result<User>.Failure($"Address not found");
        }

        var userAddress = user.UserAddresses.FirstOrDefault(x => x.AddressId == input.AddressId);

        if (userAddress == null)
        {
            _logger.LogInformation(
                $"{nameof(DeleteUserAddressAsync)}: {input.AddressId} not found"
            );
            return Result<User>.Failure($"Address not found");
        }

        user.UserAddresses.Remove(userAddress);

        await _context.SaveChangesAsync();

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> UpdateUserSettingsAsync(UpdateUserSettingsInput input)
    {
        _logger.LogInformation($"{nameof(UpdateUserSettingsAsync)} {input.UserId}");

        var user = await _context.Users
            .Include(x => x.UserSettings)
            .FirstOrDefaultAsync(x => x.Id == input.UserId);

        if (user == null)
        {
            _logger.LogInformation($"{nameof(UpdateUserSettingsAsync)}: {input.UserId} not found");
            return Result<User>.Failure($"User not found");
        }

        user.UserSettings = input.ToUserSettings();

        await _context.SaveChangesAsync();

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> CreateUserPhoneNumberAsync(CreateUserPhoneNumberInput input)
    {
        _logger.LogInformation($"{nameof(CreateUserPhoneNumberAsync)}: {input.UserId}");

        var user = await _context.Users
            .Include(x => x.UserPhoneNumbers)
            .ThenInclude(x => x.PhoneNumber)
            .FirstOrDefaultAsync(x => x.Id == input.UserId);

        if (user == null)
        {
            _logger.LogInformation(
                $"{nameof(CreateUserPhoneNumberAsync)}: {input.UserId} not found"
            );
            return Result<User>.Failure($"User not found");
        }

        var phoneNumber = input.PhoneNumber.ToPhoneNumber();

        var userPhoneNumber = new UserPhoneNumber
        {
            PhoneNumber = phoneNumber,
            PhoneNumberType = input.PhoneNumberType
        };

        user.UserPhoneNumbers.Add(userPhoneNumber);

        await _context.SaveChangesAsync();

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> UpdateUserPhonNumberAsync(UpdateUserPhoneNumberInput input)
    {
        _logger.LogInformation($"{nameof(UpdateUserPhonNumberAsync)} {input.UserId}");

        var user = await _context.Users
            .Include(x => x.UserPhoneNumbers)
            .ThenInclude(x => x.PhoneNumber)
            .FirstOrDefaultAsync(x => x.Id == input.UserId);

        if (user == null)
        {
            _logger.LogInformation(
                $"{nameof(UpdateUserPhonNumberAsync)}: {input.UserId} not found"
            );
            return Result<User>.Failure($"User not found");
        }

        var phoneNumber = await _context.PhoneNumbers.FirstOrDefaultAsync(
            x => x.Id == input.PhoneNumberId
        );

        if (phoneNumber == null)
        {
            _logger.LogInformation(
                $"{nameof(UpdateUserPhonNumberAsync)}: {input.PhoneNumberId} not found"
            );
            return Result<User>.Failure($"Phone number not found");
        }

        var userPhoneNumber = user.UserPhoneNumbers.FirstOrDefault(
            x => x.PhoneNumberId == input.PhoneNumberId
        );

        if (userPhoneNumber == null)
        {
            _logger.LogInformation(
                $"{nameof(UpdateUserPhonNumberAsync)}: {input.PhoneNumberId} not found"
            );
            return Result<User>.Failure($"Phone number not found");
        }

        userPhoneNumber.PhoneNumberType = input.PhoneNumberType;
        userPhoneNumber.PhoneNumber.MainNumber = input.PhoneNumber.MainNumber;

        await _context.SaveChangesAsync();

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> DeleteUserPhoneNumberAsync(DeleteUserPhoneNumberInput input)
    {
        _logger.LogInformation($"{nameof(DeleteUserPhoneNumberAsync)} {input.UserId}");

        var user = await _context.Users
            .Include(x => x.UserPhoneNumbers)
            .ThenInclude(x => x.PhoneNumber)
            .FirstOrDefaultAsync(x => x.Id == input.UserId);

        if (user == null)
        {
            _logger.LogInformation(
                $"{nameof(DeleteUserPhoneNumberAsync)}: {input.UserId} not found"
            );
            return Result<User>.Failure($"User not found");
        }

        var phoneNumber = await _context.PhoneNumbers.FirstOrDefaultAsync(
            x => x.Id == input.PhoneNumberId
        );

        if (phoneNumber == null)
        {
            _logger.LogInformation(
                $"{nameof(DeleteUserPhoneNumberAsync)}: {input.PhoneNumberId} not found"
            );
            return Result<User>.Failure($"Phone number not found");
        }

        var userPhoneNumber = user.UserPhoneNumbers.FirstOrDefault(
            x => x.PhoneNumberId == input.PhoneNumberId
        );

        if (userPhoneNumber == null)
        {
            _logger.LogInformation(
                $"{nameof(DeleteUserPhoneNumberAsync)}: {input.PhoneNumberId} not found"
            );
            return Result<User>.Failure($"Phone number not found");
        }

        user.UserPhoneNumbers.Remove(userPhoneNumber);

        await _context.SaveChangesAsync();

        return Result<User>.Success(user);
    }

    public async Task<Result<User>> SwitchUserRoleAsync(SwitchUserRoleInput input)
    {
        if (_authenticatedUserService.AuthenticatedUser == null)
        {
            _logger.LogInformation($"{nameof(SwitchUserRoleAsync)}: User not found");

            return Result<User>.Failure($"User not found");
        }

        var userId = _authenticatedUserService.AuthenticatedUser.User.Id;

        _logger.LogInformation($"{nameof(SwitchUserRoleAsync)}: {userId}");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var user = await _context.Users
                .Include(x => x.UserRoles)
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                _logger.LogInformation($"{nameof(SwitchUserRoleAsync)}: {userId} not found");

                return Result<User>.Failure($"User not found");
            }

            if (!user.UserRoles.Any(x => x.Id == input.RoleId))
            {
                _logger.LogInformation(
                    $"{nameof(SwitchUserRoleAsync)}: {input.RoleId} not found for user {userId}"
                );

                return Result<User>.Failure($"Role not found for user");
            }

            user.SelectedUserRoleId = input.RoleId;
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return Result<User>.Failure(ex.Message);
        }

        return await GetUserAsync(userId);
    }
}
