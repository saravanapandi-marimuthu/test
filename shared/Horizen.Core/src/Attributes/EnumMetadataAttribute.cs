namespace Horizen.Core.Attributes;

[AttributeUsage(AttributeTargets.Field, Inherited = false, AllowMultiple = false)]
public sealed class EnumMetadataAttribute : Attribute
{
    public string Name { get; }
    public string Description { get; }

    public EnumMetadataAttribute(string name, string description)
    {
        Name = name;
        Description = description;
    }
}
