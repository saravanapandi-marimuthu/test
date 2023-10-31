using Horizen.Core.Attributes;

namespace Horizen.Data.Domain.UserRoles.Enums;

[Flags]
public enum RoleTypes
{
    [EnumMetadata("Unassigned", "Unknown")]
    Unassigned = 0,

    [EnumMetadata("Contact", "Contact")]
    Contact = 1 << 0,

    [EnumMetadata("Basic User", "Basic User Access")]
    BasicUser = 1 << 1,

    [EnumMetadata("Agronomist", "Agronomist/CCA")]
    Agronomist = 1 << 2,

    [EnumMetadata("Order Manager", "Order Manager")]
    OrderManager = 1 << 3,

    [EnumMetadata("Sales Manager", "Sales Manager")]
    SalesManager = 1 << 4,

    [EnumMetadata("Sales Rep", "Sales Representative")]
    SalesRep = 1 << 5,

    [EnumMetadata("Applicator", "Applicator")]
    Applicator = 1 << 6,

    [EnumMetadata("Blender", "Blender")]
    Blender = 1 << 7,

    [EnumMetadata("Dispatcher", "Dispatcher")]
    Dispatcher = 1 << 8,

    [EnumMetadata("Driver", "Driver")]
    Driver = 1 << 9,

    [EnumMetadata("Puller", "Soil Sample Puller")]
    Puller = 1 << 10,

    [EnumMetadata("Company Admin", "Company Administrator")]
    CompanyAdmin = 1 << 20,

    [EnumMetadata("Super Admin", "Super Administrator")]
    SuperAdmin = 1 << 30,

    All = ~Contact,
}
