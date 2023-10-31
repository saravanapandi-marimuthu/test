using Horizen.Core.Attributes;
using Horizen.Core.Models;
using Horizen.Core.Utilities;
using Horizen.Data.Domain.Billing.Entities;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Enums;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using Horizen.Data.Domain.EnterpriseItems.Entities;
using Horizen.Data.Domain.Fields.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Horizen.Data.Domain.RetailOrders.Entities;
using Horizen.Data.Domain.UserRoles.Entities;
using Horizen.Data.Domain.Warehouses.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Horizen.Data.Domain.Companies.Entities;

public class Company : BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [SkipInGraphQL]
    public string NormalizedName { get; set; } = "";
    public string Name { get; set; } = "";
    public string? ShortName { get; set; }
    public Guid? ParentCompanyId { get; set; }
    public string? ExternalId { get; set; }

    [SkipInGraphQL]
    public CompanyServiceTypes ServiceType { get; set; }

    public string? LogoUrl { get; set; }
    public string? HomepageUrl { get; set; }
    public string? Notes { get; set; }
    public CompanyExtendedProperties ExtendedProperties { get; set; } =
        new CompanyExtendedProperties();
    public Company? ParentCompany { get; set; }
    public ICollection<Company> ChildCompanies { get; set; } = new List<Company>();
    public ICollection<CompanyTag> CompanyTags { get; set; } = new List<CompanyTag>();
    public ICollection<CompanyAddress> CompanyAddresses { get; set; } = new List<CompanyAddress>();
    public ICollection<CompanyPhoneNumber> CompanyPhoneNumbers { get; set; } =
        new List<CompanyPhoneNumber>();
    public ICollection<CompanyFeature> CompanyFeatures { get; set; } = new List<CompanyFeature>();

    public ICollection<CompanyPreset> CompanyPresets { get; set; } = new List<CompanyPreset>();
    public ICollection<CompanyExternalServiceAccount> CompanyExternalServiceAccounts { get; set; } =
        new List<CompanyExternalServiceAccount>();

    public ICollection<CompanyRelationship> FirstCompanyRelationships { get; set; } =
        new List<CompanyRelationship>();

    public ICollection<CompanyRelationship> SecondCompanyRelationships { get; set; } =
        new List<CompanyRelationship>();

    public ICollection<ManufacturerProduct> ManufacturerProducts { get; set; } =
        new List<ManufacturerProduct>();
    public ICollection<RetailerProduct> RetailerProducts { get; set; } =
        new List<RetailerProduct>();
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<Warehouse> Warehouses { get; set; } = new List<Warehouse>();

    public ICollection<PurchaseOrder> PurchaseOrders { get; set; } = new List<PurchaseOrder>();

    public ICollection<PurchaseOrder> VendorPurchaseOrders { get; set; } =
        new List<PurchaseOrder>();

    public ICollection<EnterpriseItem> EnterpriseItems { get; set; } = new List<EnterpriseItem>();
    public ICollection<BillingSplitGroupAccount> BillingSplitGroupAccounts { get; set; } =
        new List<BillingSplitGroupAccount>();

    public ICollection<Field> Fields { get; set; } = new List<Field>();

    public ICollection<RetailOrder> RetailOrders { get; set; } = new List<RetailOrder>();
    public ICollection<RetailOrder> CustomerRetailOrders { get; set; } = new List<RetailOrder>();

    [NotMapped]
    public IEnumerable<CompanyServiceTypes> Services
    {
        get
        {
            return Enum.GetValues(typeof(CompanyServiceTypes))
                .Cast<CompanyServiceTypes>()
                .Where(r => (ServiceType & r) == r && r != CompanyServiceTypes.Unknown);
        }
        set
        {
            if (value == null)
            {
                ServiceType = CompanyServiceTypes.Unknown;
                return;
            }

            CompanyServiceTypes combinedRole = CompanyServiceTypes.Unknown;

            foreach (var role in value)
            {
                combinedRole |= role;
            }

            ServiceType = combinedRole;
        }
    }

    [NotMapped]
    public List<EnumInfo<CompanyServiceTypes>> ServicesInfo
    {
        get => EnumUtility.GetFlagsInfo(ServiceType, CompanyServiceTypes.Unknown);
    }
}
