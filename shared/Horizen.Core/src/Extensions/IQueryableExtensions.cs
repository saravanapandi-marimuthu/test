using System.Linq.Expressions;

namespace Horizen.Core.Extensions;

public static class IQueryableExtensions
{
    public static IQueryable<T> OrderBy<T>(
        this IQueryable<T> source,
        string propertyName,
        bool isDescending = true
    )
    {
        if (source == null)
            throw new ArgumentNullException(nameof(source));
        if (string.IsNullOrWhiteSpace(propertyName))
            return source; // No sorting, return original source

        var parameter = Expression.Parameter(source.ElementType, string.Empty);
        var property = Expression.Property(parameter, propertyName);
        var lambda = Expression.Lambda(property, parameter);

        string method = isDescending ? "OrderByDescending" : "OrderBy";
        var sortMethod = typeof(Queryable)
            .GetMethods()
            .Single(
                m =>
                    m.Name == method
                    && m.IsGenericMethodDefinition
                    && m.GetGenericArguments().Length == 2
                    && m.GetParameters().Length == 2
            )
            .MakeGenericMethod(source.ElementType, property.Type);

        var result = sortMethod.Invoke(null, new object[] { source, lambda });

        if (result is IQueryable<T> queryableResult)
        {
            return queryableResult;
        }
        else
        {
            throw new InvalidOperationException("Unexpected result when trying to sort.");
        }
    }
}
