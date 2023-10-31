using System.Reflection;
using Horizen.Core.Attributes;
using HotChocolate.Types.Descriptors;

namespace Horizen.WebApi.GraphQL.Middleware;

public class CustomTypeInspector : DefaultTypeInspector
{
    public CustomTypeInspector()
    {
        Console.WriteLine("Initializing CustomTypeInspector");
    }

    public override bool IsMemberIgnored(MemberInfo member)
    {
        if (member.GetCustomAttribute<SkipInGraphQLAttribute>() != null)
        {
            return true;
        }

        return base.IsMemberIgnored(member);
    }
}
