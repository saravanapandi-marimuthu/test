using System.Reflection;
using Horizen.Data.Attributes;
using Horizen.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace Horizen.Data;

public static class ServiceExtensions
{
    public static IServiceCollection AddHorizenDb(
        this IServiceCollection services,
        IConfiguration configuration,
        string connectionStringName = "DefaultConnection",
        string redisConnectionStringName = "Redis"
    )
    {
        var connectionString = configuration.GetConnectionString(connectionStringName);

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new Exception($"Database Connection string {connectionStringName} is not set");
        }

        services.AddDbContext<HorizenDbContext>(
            options => options.UseNpgsql(connectionString, o => o.UseNetTopologySuite())
        );

        var redisConnectionString = configuration.GetConnectionString(redisConnectionStringName);

        if (string.IsNullOrEmpty(redisConnectionString))
        {
            throw new Exception($"Redis connection string {redisConnectionString} is not set");
        }

        services.AddSingleton<IConnectionMultiplexer>(x =>
        {
            var connectionConfiguration = ConfigurationOptions.Parse(redisConnectionString, true);
            return ConnectionMultiplexer.Connect(connectionConfiguration);
        });

        services.AddDataServices();

        return services;
    }

    private static IServiceCollection AddDataServices(this IServiceCollection services)
    {
        // Get types from the currently executing assembly
        var dataServiceTypes = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(
                t =>
                    t.GetCustomAttribute<DataServiceAttribute>() != null
                    && !t.IsAbstract
                    && !t.IsInterface
            );

        foreach (var type in dataServiceTypes)
        {
            Console.WriteLine(type.Name);

            // Assuming you want to add them as transient, but you can change this to Scoped or Singleton as required.
            services.AddScoped(type);
        }

        return services;
    }
}
