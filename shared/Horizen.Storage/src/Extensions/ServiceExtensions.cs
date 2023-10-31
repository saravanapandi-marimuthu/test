using System.Reflection;
using Horizen.Storage.Blobs;
using Horizen.Storage.Queues;
using Horizen.Storage.Tables;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Horizen.Storage;

public static class ServiceExtensions
{
    public static IServiceCollection AddHorizenStorage(
        this IServiceCollection services,
        string connectionStringName
    )
    {
        Type interfaceType = typeof(ITableService);
        // Get types from the currently executing assembly
        var derivedTypes = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(t => interfaceType.IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

        Console.WriteLine($"Types derived from interface {interfaceType.Name}:");

        // foreach (var type in derivedTypes)
        // {
        //     Console.WriteLine(type.Name);
        //     services.AddSingleton(
        //         interfaceType,
        //         provider =>
        //         {
        //             var configuration = provider.GetRequiredService<IConfiguration>();
        //             var connectionString = configuration.GetConnectionString(connectionStringName);
        //             var loggerFactory = provider.GetRequiredService<ILoggerFactory>();
        //             var logger = loggerFactory.CreateLogger(type);
        //             var instance = Activator.CreateInstance(type, logger, connectionString);

        //             return instance!;
        //         }
        //     );
        // }

        services.AddSingleton(provider =>
        {
            var configuration = provider.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString(connectionStringName);
            var loggerFactory = provider.GetRequiredService<ILoggerFactory>();
            var logger = loggerFactory.CreateLogger<UrlTableService>();

            return new UrlTableService(logger, connectionString!);
        });

        services.AddSingleton(provider =>
        {
            var configuration = provider.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString(connectionStringName);
            var loggerFactory = provider.GetRequiredService<ILoggerFactory>();
            var logger = loggerFactory.CreateLogger<BlobService>();

            return new BlobService(logger, connectionString!);
        });

        services.AddSingleton(provider =>
        {
            var configuration = provider.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString(connectionStringName);
            var loggerFactory = provider.GetRequiredService<ILoggerFactory>();
            var logger = loggerFactory.CreateLogger<UserInviteQueueService>();

            return new UserInviteQueueService(logger, connectionString!);
        });
        return services;
    }
}
