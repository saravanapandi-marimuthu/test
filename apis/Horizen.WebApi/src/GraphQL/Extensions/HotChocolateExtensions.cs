using System.Reflection;
using Horizen.WebApi.GraphQL.Schema;
using Horizen.WebApi.GraphQL.Schema.Companies;
using Horizen.WebApi.GraphQL.Schema.Configurations;
using HotChocolate.Execution.Configuration;

namespace Horizen.WebApi.GraphQL.Extensions;

public static class HotChocolateExtensions
{
    public static IRequestExecutorBuilder AddQueries(this IRequestExecutorBuilder builder)
    {
        var queryTypes = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(
                t =>
                    t.GetCustomAttribute<QueryTypeAttribute>() != null
                    && !t.IsAbstract
                    && !t.IsInterface
            );

        foreach (var type in queryTypes)
        {
            Console.WriteLine(type.Name);
            builder.AddType(type);
        }

        return builder;
    }

    public static IRequestExecutorBuilder AddMutations(this IRequestExecutorBuilder builder)
    {
        var mutationTypes = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(
                t =>
                    t.GetCustomAttribute<MutationTypeAttribute>() != null
                    && !t.IsAbstract
                    && !t.IsInterface
            );

        foreach (var type in mutationTypes)
        {
            Console.WriteLine(type.Name);
            builder.AddType(type);
        }

        return builder;
    }
}
