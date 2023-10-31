using System.Reflection;
using Horizen.DataSprout.Seeders;
using Horizen.Data.Domain.Auth.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Horizen.DataSprout.Services;

public static class ServiceExtensions
{
    public static IServiceCollection AddSeedServices(this IServiceCollection services)
    {
        services.AddSingleton<IAuthenticatedUserService, FakeAuthenticatedUserService>();
        Type interfaceType = typeof(ISeeder);
        // Get types from the currently executing assembly
        var derivedTypes = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(t => interfaceType.IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

        Console.WriteLine($"Types derived from interface {interfaceType.Name}:");

        foreach (var type in derivedTypes)
        {
            Console.WriteLine(type.Name);
            services.AddScoped(type);
        }

        return services;
        // service
        //     .AddScoped<DataSeederService>()
        //     .AddScoped<DataSeeder>()
        //     .AddScoped<CompanySeeder>()
        //     .AddScoped<TagSeeder>()
        //     .AddScoped<UserSeeder>()
        //     .AddScoped<UserRoleSeeder>();

        // return service;
    }
}
