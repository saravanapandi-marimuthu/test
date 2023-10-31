using System.Reflection;
using Horizen.Data.Domain.Accounts.Entities;
using Horizen.Data.Domain.Billing.Entities;
using Horizen.Data.Domain.Common.Entities;
using Horizen.Data.Domain.Companies.Entities;
using Horizen.Data.Domain.CompanyRelationships.Entities;
using Horizen.Data.Domain.Configurations.Entities;
using Horizen.Data.Domain.CustomerDeliveryLocations.Entities;
using Horizen.Data.Domain.EnterpriseItems.Entities;
using Horizen.Data.Domain.Fields.Entities;
using Horizen.Data.Domain.Freight.Entities;
using Horizen.Data.Domain.Inventory.Entities;
using Horizen.Data.Domain.ManufacturerProducts.Entities;
using Horizen.Data.Domain.PurchaseOrders.Entities;
using Horizen.Data.Domain.Rebates.Entities;
using Horizen.Data.Domain.RetailerProducts.Entities;
using Horizen.Data.Domain.RetailOrders.Entities;
using Horizen.Data.Domain.UserRoles.Entities;
using Horizen.Data.Domain.Users.Entities;
using Horizen.Data.Domain.Warehouses.Entities;
using Microsoft.EntityFrameworkCore;

namespace Horizen.Data.Context;

public class HorizenDbContext : DbContext
{
    #region Configurations
    public DbSet<TagCategory> TagCategories { get; set; } = null!;
    public DbSet<Tag> Tags { get; set; } = null!;
    public DbSet<UnitOfMeasurement> UnitOfMeasurements { get; set; } = null!;
    public DbSet<Package> Packages { get; set; } = null!;
    public DbSet<PaymentTerm> PaymentTerms { get; set; } = null!;
    #endregion

    public DbSet<Address> Addresses { get; set; } = null!;
    public DbSet<PhoneNumber> PhoneNumbers { get; set; } = null!;
    public DbSet<GeoLocation> GeoLocations { get; set; } = null!;

    #region Users
    public DbSet<UserInvite> UserInvites { get; set; } = null!;
    public DbSet<ExternalUser> ExternalUsers { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<UserTag> UserTags { get; set; } = null!;
    public DbSet<UserAddress> UserAddresses { get; set; } = null!;
    public DbSet<UserPhoneNumber> UserPhoneNumbers { get; set; } = null!;
    public DbSet<UserSettings> UserSettings { get; set; } = null!;
    #endregion

    #region UserRoles
    public DbSet<UserRole> UserRoles { get; set; } = null!;
    #endregion

    #region Companies
    public DbSet<Company> Companies { get; set; } = null!;
    public DbSet<CompanyTag> CompanyTags { get; set; } = null!;
    public DbSet<CompanyAddress> CompanyAddresses { get; set; } = null!;
    public DbSet<CompanyPhoneNumber> CompanyPhoneNumbers { get; set; } = null!;
    public DbSet<CompanyPreset> CompanySettings { get; set; } = null!;
    public DbSet<CompanyFeature> CompanyFeatures { get; set; } = null!;
    public DbSet<CompanyExternalServiceAccount> CompanyExternalServiceAccounts { get; set; } =
        null!;
    #endregion

    #region CompanyRelationships
    public DbSet<CompanyRelationship> CompanyRelationships { get; set; } = null!;
    public DbSet<CompanyRelationshipAttachment> CompanyRelationshipAttachments { get; set; } =
        null!;
    public DbSet<CompanyRelationshipTag> CompanyRelationshipTags { get; set; } = null!;
    #endregion

    #region Manufacturer Products
    public DbSet<ManufacturerProduct> ManufacturerProducts { get; set; } = null!;
    public DbSet<ProductAvailability> ProductAvailabilities { get; set; } = null!;
    public DbSet<ProductDocument> ProductDocuments { get; set; } = null!;
    public DbSet<ManufacturerPrice> ManufacturerPrices { get; set; } = null!;
    #endregion

    #region Retailer Products
    public DbSet<RetailerProduct> RetailerProducts { get; set; } = null!;
    public DbSet<RetailerProductPrice> RetailerProductPrices { get; set; } = null!;
    public DbSet<RetailerProductComponent> RetailerProductComponents { get; set; } = null!;
    public DbSet<RetailerProductDiscount> RetailerProductDiscounts { get; set; } = null!;
    public DbSet<RetailerProductComponentCost> RetailerProductComponentCosts { get; set; } = null!;
    #endregion

    #region Rebates
    public DbSet<ManufacturerRebate> Rebates { get; set; } = null!;
    #endregion

    #region Warehouse
    public DbSet<Warehouse> Warehouses { get; set; } = null!;
    public DbSet<WarehouseAddress> WarehouseAddresses { get; set; } = null!;
    public DbSet<WarehousePhoneNumber> WarehousePhoneNumbers { get; set; } = null!;
    public DbSet<StorageLocation> StorageLocations { get; set; } = null!;
    #endregion

    #region Freight
    public DbSet<FreightProvider> FreightProviders { get; set; } = null!;
    public DbSet<FreightRate> FreightRates { get; set; } = null!;
    public DbSet<FreightZone> FreightRateZones { get; set; } = null!;
    #endregion

    #region Enterprise
    public DbSet<EnterpriseItem> EnterpriseItems { get; set; } = null!;
    #endregion

    #region Fields
    public DbSet<Field> Fields { get; set; } = null!;
    public DbSet<FieldTag> FieldTags { get; set; } = null!;
    public DbSet<FieldVersion> FieldVersions { get; set; } = null!;
    public DbSet<FieldVersionTag> FieldVersionTags { get; set; } = null!;
    public DbSet<FieldLayer> FieldLayers { get; set; } = null!;
    public DbSet<FieldLayerZone> FieldLayerZones { get; set; } = null!;
    #endregion

    #region Billing
    public DbSet<BillingSplitGroup> BillingSplitGroups { get; set; } = null!;
    public DbSet<BillingSplitGroupAccount> BillingSplitGroupAccounts { get; set; } = null!;
    public DbSet<BillingSplitItem> BillingSplitItems { get; set; } = null!;
    public DbSet<BillingAccountSplitAllocation> BillingAccountSplitAllocations { get; set; } =
        null!;
    #endregion

    #region Accounts
    public DbSet<BillingAccount> BillingAccounts { get; set; } = null!;
    public DbSet<TransactionJournalEntry> TransactionJournalEntries { get; set; } = null!;
    #endregion

    #region Customer Delivery Locations
    public DbSet<CustomerDeliveryLocation> CustomerDeliveryLocations { get; set; } = null!;
    public DbSet<CustomerDeliveryLocationAddress> CustomerDeliveryLocationAddresses { get; set; } =
        null!;
    public DbSet<CustomerDeliveryLocationPhoneNumber> CustomerDeliveryLocationPhoneNumbers { get; set; } =
        null!;
    #endregion

    #region Purchase Orders
    public DbSet<PurchaseOrder> PurchaseOrders { get; set; } = null!;
    public DbSet<PurchaseOrderLineItem> PurchaseOrderLineItems { get; set; } = null!;
    public DbSet<PurchaseOrderApprover> PurchaseOrderApprovers { get; set; } = null!;
    public DbSet<PurchaseOrderDiscount> PurchaseOrderDiscounts { get; set; } = null!;
    public DbSet<PurchaseOrderFee> PurchaseOrderFees { get; set; } = null!;

    #endregion

    #region Retail Orders
    public DbSet<RetailOrder> RetailOrders { get; set; } = null!;
    public DbSet<RetailOrderTag> RetailOrderTags { get; set; } = null!;
    public DbSet<RetailOrderLineItem> RetailOrderLineItems { get; set; } = null!;
    public DbSet<RetailOrderLineItemSchedule> RetailOrderLineItemSchedules { get; set; } = null!;
    public DbSet<RetailOrderItemTag> RetailOrderItemTags { get; set; } = null!;
    public DbSet<RetailOrderFieldInfo> RetailOrderFieldInfos { get; set; } = null!;
    public DbSet<RetailOrderComponentOverride> RetailOrderComponentOverrides { get; set; } = null!;
    #endregion

    #region Inventory
    public DbSet<InventoryItem> InventoryItems { get; set; } = null!;
    public DbSet<InventoryItemLotInfo> InventoryItemLotInfos { get; set; } = null!;
    public DbSet<InventoryItemLotInfoBarCodeEntry> InventoryItemLotInfoBarCodeEntries { get; set; } =
        null!;
    public DbSet<InventoryTransactionLedgerEntry> InventoryTransactionLedgerEntries { get; set; } =
        null!;
    #endregion

    public HorizenDbContext(DbContextOptions<HorizenDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all configurations using reflection
        var typeToRegister = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(
                t =>
                    !t.IsAbstract
                    && !t.IsGenericTypeDefinition
                    && t.GetInterfaces()
                        .Any(
                            gi =>
                                gi.IsGenericType
                                && gi.GetGenericTypeDefinition()
                                    == typeof(IEntityTypeConfiguration<>)
                        )
            )
            .ToList();

        foreach (var type in typeToRegister)
        {
            dynamic configurationInstance = Activator.CreateInstance(type)!;
            modelBuilder.ApplyConfiguration(configurationInstance);
        }
    }

    public override int SaveChanges()
    {
        SetAuditValues();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        SetAuditValues();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void SetAuditValues()
    {
        var entries = ChangeTracker.Entries<BaseEntity>();

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;

                // Ensure that the CreatedAt property is not modified
                entry.Property("CreatedAt").IsModified = false;
            }
        }
    }

    public override void Dispose()
    {
        base.Dispose();
    }

    public override ValueTask DisposeAsync()
    {
        return base.DisposeAsync();
    }
}
