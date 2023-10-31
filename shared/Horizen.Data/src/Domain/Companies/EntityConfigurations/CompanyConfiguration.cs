using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Companies.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Companies.EntityConfigurations;

public class CompanyConfiguration : BaseModelConfiguration<Company>
{
    public override void Configure(EntityTypeBuilder<Company> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.HasIndex(e => e.NormalizedName).IsUnique();
        builder.Property(e => e.Name).IsRequired();

        builder.OwnsOne(e => e.ExtendedProperties);

        builder
            .HasOne(e => e.ParentCompany)
            .WithMany(e => e.ChildCompanies)
            .HasForeignKey(e => e.ParentCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.ChildCompanies)
            .WithOne(e => e.ParentCompany)
            .HasForeignKey(e => e.ParentCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CompanyTags)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CompanyAddresses)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CompanyPhoneNumbers)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CompanyFeatures)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CompanyPresets)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CompanyExternalServiceAccounts)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.RetailerProducts)
            .WithOne(e => e.RetailerCompany)
            .HasForeignKey(e => e.RetailerCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.PurchaseOrders)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.VendorPurchaseOrders)
            .WithOne(e => e.VendorCompany)
            .HasForeignKey(e => e.VendorCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.EnterpriseItems)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.BillingSplitGroupAccounts)
            .WithOne(e => e.AccountCompany)
            .HasForeignKey(e => e.AccountCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.Fields)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.RetailOrders)
            .WithOne(e => e.RetailerCompany)
            .HasForeignKey(e => e.RetailerCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.CustomerRetailOrders)
            .WithOne(e => e.CustomerCompany)
            .HasForeignKey(e => e.CustomerCompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(e => e.UserRoles)
            .WithOne(e => e.Company)
            .HasForeignKey(e => e.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
