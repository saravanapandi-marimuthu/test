using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Horizen.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:postgis", ",,");

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AddressLine1 = table.Column<string>(type: "text", nullable: false),
                    AddressLine2 = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: false),
                    State = table.Column<string>(type: "text", nullable: false),
                    PostalCode = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillingAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountName = table.Column<string>(type: "text", nullable: false),
                    AccountNumber = table.Column<string>(type: "text", nullable: true),
                    AccountClassification = table.Column<int>(type: "integer", nullable: false),
                    AccountType = table.Column<int>(type: "integer", nullable: false),
                    AccountSubType = table.Column<int>(type: "integer", nullable: true),
                    AccountStatus = table.Column<int>(type: "integer", nullable: false),
                    ExternalAccountId = table.Column<string>(type: "text", nullable: true),
                    ExternalAccountName = table.Column<string>(type: "text", nullable: true),
                    ExternalSubAccountName = table.Column<string>(type: "text", nullable: true),
                    ParentAccountId = table.Column<int>(type: "integer", nullable: true),
                    ExtendedProperties_Version = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingAccounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ShortName = table.Column<string>(type: "text", nullable: true),
                    ParentCompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    ExternalId = table.Column<string>(type: "text", nullable: true),
                    ServiceType = table.Column<int>(type: "integer", nullable: false),
                    LogoUrl = table.Column<string>(type: "text", nullable: true),
                    HomepageUrl = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties_GaPageParam = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Companies_Companies_ParentCompanyId",
                        column: x => x.ParentCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FreightProviders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FreightProviders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FreightRateZones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FreightRateZones", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GeoLocations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Point = table.Column<Point>(type: "geometry", nullable: false),
                    Accuracy = table.Column<double>(type: "double precision", nullable: true),
                    Altitude = table.Column<double>(type: "double precision", nullable: true),
                    Source = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeoLocations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentTerms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    TermName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    DueDays = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentTerms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhoneNumbers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MainNumber = table.Column<string>(type: "text", nullable: false),
                    Extension = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneNumbers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RebateCondition",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MinPurchaseAmount = table.Column<decimal>(type: "numeric", nullable: true),
                    MinPurchaseQuantity = table.Column<int>(type: "integer", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RebateCondition", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RetailerProductDiscounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RetailProductId = table.Column<int>(type: "integer", nullable: false),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<decimal>(type: "numeric", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailerProductDiscounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RetailOrderLineItemSchedules",
                columns: table => new
                {
                    RetailOrderLineItemId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ScheduleStatus = table.Column<int>(type: "integer", nullable: false),
                    ScheduledDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ScheduleStatusReason = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailOrderLineItemSchedules", x => x.RetailOrderLineItemId);
                });

            migrationBuilder.CreateTable(
                name: "TagCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    ColorIndex = table.Column<int>(type: "integer", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UnitOfMeasurements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BaseUnitId = table.Column<int>(type: "integer", nullable: true),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    SingularName = table.Column<string>(type: "text", nullable: true),
                    PluralName = table.Column<string>(type: "text", nullable: true),
                    UnitOfMeasurementType = table.Column<int>(type: "integer", nullable: false),
                    ConversionFactor = table.Column<decimal>(type: "numeric", nullable: true),
                    NumeratorUnitId = table.Column<int>(type: "integer", nullable: true),
                    NumeratorUnitType = table.Column<int>(type: "integer", nullable: true),
                    NumeratorMultiplier = table.Column<decimal>(type: "numeric", nullable: false),
                    DenominatorUnitId = table.Column<int>(type: "integer", nullable: true),
                    DenominatorUnitType = table.Column<int>(type: "integer", nullable: true),
                    DenominatorMultiplier = table.Column<decimal>(type: "numeric", nullable: false),
                    ColorIndex = table.Column<int>(type: "integer", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfMeasurements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitOfMeasurements_UnitOfMeasurements_BaseUnitId",
                        column: x => x.BaseUnitId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UnitOfMeasurements_UnitOfMeasurements_DenominatorUnitId",
                        column: x => x.DenominatorUnitId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UnitOfMeasurements_UnitOfMeasurements_NumeratorUnitId",
                        column: x => x.NumeratorUnitId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TransactionJournalEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BillingAccountId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Debit = table.Column<decimal>(type: "numeric", nullable: true),
                    Credit = table.Column<decimal>(type: "numeric", nullable: true),
                    Memo = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionJournalEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionJournalEntries_BillingAccounts_BillingAccountId",
                        column: x => x.BillingAccountId,
                        principalTable: "BillingAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyAddresses",
                columns: table => new
                {
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false),
                    AddressType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyAddresses", x => new { x.CompanyId, x.AddressId });
                    table.ForeignKey(
                        name: "FK_CompanyAddresses_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyAddresses_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyExternalServiceAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ServiceName = table.Column<string>(type: "text", nullable: false),
                    AccessToken = table.Column<string>(type: "text", nullable: false),
                    RefreshToken = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyExternalServiceAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyExternalServiceAccounts_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Feature = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyFeatures_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyRelationships",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PrimaryCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    RelatedCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyRelationshipType = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CompanyRelationshipStatus = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyRelationships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyRelationships_Companies_PrimaryCompanyId",
                        column: x => x.PrimaryCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyRelationships_Companies_RelatedCompanyId",
                        column: x => x.RelatedCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ManufacturerProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ManufacturerCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ExternalId = table.Column<string>(type: "text", nullable: true),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    ProductName = table.Column<string>(type: "text", nullable: false),
                    ProductCategory = table.Column<int>(type: "integer", nullable: true),
                    ProductType = table.Column<int>(type: "integer", nullable: true),
                    UPC = table.Column<string>(type: "text", nullable: true),
                    ProductSku = table.Column<string>(type: "text", nullable: true),
                    BarCode = table.Column<string>(type: "text", nullable: true),
                    LabelDAT = table.Column<string>(type: "text", nullable: true),
                    LogoId = table.Column<int>(type: "integer", nullable: false),
                    ManId = table.Column<int>(type: "integer", nullable: false),
                    EPA = table.Column<string>(type: "text", nullable: true),
                    ManufacturerName = table.Column<string>(type: "text", nullable: true),
                    CommonName = table.Column<string>(type: "text", nullable: true),
                    HasIcon = table.Column<bool>(type: "boolean", nullable: true),
                    IconUrl = table.Column<string>(type: "text", nullable: true),
                    IconUI = table.Column<string>(type: "text", nullable: true),
                    GaPageParam = table.Column<string>(type: "text", nullable: true),
                    IsUs = table.Column<bool>(type: "boolean", nullable: false),
                    IsCanada = table.Column<bool>(type: "boolean", nullable: false),
                    IsCoPack = table.Column<bool>(type: "boolean", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManufacturerProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ManufacturerProducts_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ManufacturerProducts_Companies_ManufacturerCompanyId",
                        column: x => x.ManufacturerCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailerProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RetailerCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    ProductName = table.Column<string>(type: "text", nullable: false),
                    ProductCategory = table.Column<int>(type: "integer", nullable: true),
                    ProductType = table.Column<int>(type: "integer", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    BrochureUrl = table.Column<string>(type: "text", nullable: true),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Sku = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailerProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetailerProducts_Companies_RetailerCompanyId",
                        column: x => x.RetailerCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderNumber = table.Column<string>(type: "text", nullable: false),
                    RetailerCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    CustomerCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties_Version = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    OrderType = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailOrders", x => x.Id);
                    table.UniqueConstraint("AK_RetailOrders_RetailerCompanyId_OrderNumber", x => new { x.RetailerCompanyId, x.OrderNumber });
                    table.ForeignKey(
                        name: "FK_RetailOrders_Companies_CustomerCompanyId",
                        column: x => x.CustomerCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrders_Companies_RetailerCompanyId",
                        column: x => x.RetailerCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserInvites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RedeemedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ResentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RevokedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RevokedBy = table.Column<string>(type: "text", nullable: true),
                    RevokedReason = table.Column<string>(type: "text", nullable: true),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInvites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserInvites_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Warehouses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RetailerCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Warehouses_Companies_RetailerCompanyId",
                        column: x => x.RetailerCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FreightRates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FreightProviderId = table.Column<int>(type: "integer", nullable: false),
                    ZoneId = table.Column<int>(type: "integer", nullable: true),
                    MinWeight = table.Column<float>(type: "real", nullable: true),
                    MaxWeight = table.Column<float>(type: "real", nullable: true),
                    MinVolume = table.Column<float>(type: "real", nullable: true),
                    MaxVolume = table.Column<float>(type: "real", nullable: true),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Active = table.Column<bool>(type: "boolean", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FreightRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FreightRates_FreightProviders_FreightProviderId",
                        column: x => x.FreightProviderId,
                        principalTable: "FreightProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FreightRates_FreightRateZones_ZoneId",
                        column: x => x.ZoneId,
                        principalTable: "FreightRateZones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Fields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Active = table.Column<bool>(type: "boolean", nullable: false),
                    GeoLocationId = table.Column<int>(type: "integer", nullable: true),
                    PlssLocation = table.Column<string>(type: "text", nullable: true),
                    PlssLocationState = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fields", x => x.Id);
                    table.UniqueConstraint("AK_Fields_CompanyId_NormalizedName", x => new { x.CompanyId, x.NormalizedName });
                    table.ForeignKey(
                        name: "FK_Fields_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Fields_GeoLocations_GeoLocationId",
                        column: x => x.GeoLocationId,
                        principalTable: "GeoLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanySettings",
                columns: table => new
                {
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: false),
                    CurrencySymbol = table.Column<string>(type: "text", nullable: false),
                    CurrencyFormat = table.Column<string>(type: "text", nullable: true),
                    Timezone = table.Column<string>(type: "text", nullable: false),
                    Locale = table.Column<string>(type: "text", nullable: false),
                    DateFormat = table.Column<string>(type: "text", nullable: false),
                    TimeFormat = table.Column<string>(type: "text", nullable: false),
                    DateTimeFormat = table.Column<string>(type: "text", nullable: false),
                    DefaultPaymentTermId = table.Column<int>(type: "integer", nullable: false),
                    PurchaseOrderStartingNumber = table.Column<int>(type: "integer", nullable: false),
                    RetailOrderStartingNumber = table.Column<int>(type: "integer", nullable: false),
                    InvoiceStartingNumber = table.Column<int>(type: "integer", nullable: false),
                    PurchaseOrderNumberFormat = table.Column<string>(type: "text", nullable: true),
                    RetailOrderNumberFormat = table.Column<string>(type: "text", nullable: true),
                    InvoiceNumberFormat = table.Column<string>(type: "text", nullable: true),
                    PurchaseOrderNumberPrefix = table.Column<string>(type: "text", nullable: true),
                    RetailOrderNumberPrefix = table.Column<string>(type: "text", nullable: true),
                    InvoiceNumberPrefix = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties_Version = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanySettings", x => x.CompanyId);
                    table.ForeignKey(
                        name: "FK_CompanySettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanySettings_PaymentTerms_DefaultPaymentTermId",
                        column: x => x.DefaultPaymentTermId,
                        principalTable: "PaymentTerms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyPhoneNumbers",
                columns: table => new
                {
                    PhoneNumberId = table.Column<int>(type: "integer", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false),
                    PhoneNumberType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyPhoneNumbers", x => new { x.CompanyId, x.PhoneNumberId });
                    table.ForeignKey(
                        name: "FK_CompanyPhoneNumbers_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyPhoneNumbers_PhoneNumbers_PhoneNumberId",
                        column: x => x.PhoneNumberId,
                        principalTable: "PhoneNumbers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rebates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RebateConditionId = table.Column<int>(type: "integer", nullable: false),
                    RetailerCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ManufacturerProductId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rebates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rebates_RebateCondition_RebateConditionId",
                        column: x => x.RebateConditionId,
                        principalTable: "RebateCondition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagCategoryId = table.Column<int>(type: "integer", nullable: false),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    ColorIndex = table.Column<int>(type: "integer", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_TagCategories_TagCategoryId",
                        column: x => x.TagCategoryId,
                        principalTable: "TagCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    BasePackageId = table.Column<int>(type: "integer", nullable: true),
                    UnitId = table.Column<int>(type: "integer", nullable: false),
                    QuantityPerItem = table.Column<decimal>(type: "numeric", nullable: false),
                    ItemsPerPackage = table.Column<int>(type: "integer", nullable: false),
                    PackagesPerPallet = table.Column<int>(type: "integer", nullable: false),
                    ColorIndex = table.Column<int>(type: "integer", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Packages_Packages_BasePackageId",
                        column: x => x.BasePackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Packages_UnitOfMeasurements_UnitId",
                        column: x => x.UnitId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyRelationshipAttachments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyRelationshipId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Path = table.Column<string>(type: "text", nullable: false),
                    MimeType = table.Column<string>(type: "text", nullable: false),
                    ThumbnailPath = table.Column<string>(type: "text", nullable: true),
                    ThumbnailMimeType = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyRelationshipAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyRelationshipAttachments_CompanyRelationships_Company~",
                        column: x => x.CompanyRelationshipId,
                        principalTable: "CompanyRelationships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CustomerDeliveryLocations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    DeliverLocationName = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerDeliveryLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerDeliveryLocations_CompanyRelationships_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "CompanyRelationships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductAvailabilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: true),
                    Region = table.Column<string>(type: "text", nullable: true),
                    Value = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductAvailabilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductAvailabilities_ManufacturerProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "ManufacturerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    SiteUrl = table.Column<string>(type: "text", nullable: false),
                    LabelFolder = table.Column<string>(type: "text", nullable: true),
                    FileName = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    DocType = table.Column<string>(type: "text", nullable: true),
                    DocId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductDocuments_ManufacturerProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "ManufacturerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailerProductComponents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RetailerProductId = table.Column<int>(type: "integer", nullable: false),
                    ManufacturerProductId = table.Column<int>(type: "integer", nullable: false),
                    UnitOfMeasurementId = table.Column<int>(type: "integer", nullable: true),
                    MeasurementValue = table.Column<decimal>(type: "numeric", nullable: true),
                    CompositionPercentage = table.Column<decimal>(type: "numeric", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailerProductComponents", x => x.Id);
                    table.UniqueConstraint("AK_RetailerProductComponents_RetailerProductId_ManufacturerPro~", x => new { x.RetailerProductId, x.ManufacturerProductId });
                    table.ForeignKey(
                        name: "FK_RetailerProductComponents_ManufacturerProducts_Manufacturer~",
                        column: x => x.ManufacturerProductId,
                        principalTable: "ManufacturerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailerProductComponents_RetailerProducts_RetailerProductId",
                        column: x => x.RetailerProductId,
                        principalTable: "RetailerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailerProductComponents_UnitOfMeasurements_UnitOfMeasurem~",
                        column: x => x.UnitOfMeasurementId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RetailOrderId = table.Column<int>(type: "integer", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderNumber = table.Column<string>(type: "text", nullable: false),
                    BillingAccountId = table.Column<int>(type: "integer", nullable: false),
                    VendorCompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    OrderStatus = table.Column<int>(type: "integer", nullable: false),
                    DateApproved = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateOrdered = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpectedDeliveryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateReceived = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TotalPrice = table.Column<float>(type: "real", nullable: false),
                    PaymentTermsId = table.Column<int>(type: "integer", nullable: false),
                    TrackingNumber = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrders", x => x.Id);
                    table.UniqueConstraint("AK_PurchaseOrders_CompanyId_OrderNumber", x => new { x.CompanyId, x.OrderNumber });
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_BillingAccounts_BillingAccountId",
                        column: x => x.BillingAccountId,
                        principalTable: "BillingAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_Companies_VendorCompanyId",
                        column: x => x.VendorCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_PaymentTerms_PaymentTermsId",
                        column: x => x.PaymentTermsId,
                        principalTable: "PaymentTerms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_RetailOrders_RetailOrderId",
                        column: x => x.RetailOrderId,
                        principalTable: "RetailOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    StorageLocationId = table.Column<int>(type: "integer", nullable: false),
                    InStockQuantity = table.Column<float>(type: "real", nullable: false),
                    UnitOfMeasurementId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItems", x => x.Id);
                    table.UniqueConstraint("AK_InventoryItems_ProductId_WarehouseId_CompanyId_StorageLocat~", x => new { x.ProductId, x.WarehouseId, x.CompanyId, x.StorageLocationId });
                    table.ForeignKey(
                        name: "FK_InventoryItems_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryItems_ManufacturerProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "ManufacturerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryItems_UnitOfMeasurements_UnitOfMeasurementId",
                        column: x => x.UnitOfMeasurementId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryItems_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WarehouseAddresses",
                columns: table => new
                {
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false),
                    AddressType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehouseAddresses", x => new { x.WarehouseId, x.AddressId });
                    table.ForeignKey(
                        name: "FK_WarehouseAddresses_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WarehouseAddresses_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WarehousePhoneNumbers",
                columns: table => new
                {
                    PhoneNumberId = table.Column<int>(type: "integer", nullable: false),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false),
                    PhoneNumberType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehousePhoneNumbers", x => new { x.WarehouseId, x.PhoneNumberId });
                    table.ForeignKey(
                        name: "FK_WarehousePhoneNumbers_PhoneNumbers_PhoneNumberId",
                        column: x => x.PhoneNumberId,
                        principalTable: "PhoneNumbers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WarehousePhoneNumbers_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FieldVersions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Active = table.Column<bool>(type: "boolean", nullable: false),
                    FieldId = table.Column<int>(type: "integer", nullable: false),
                    EstimatedArea = table.Column<float>(type: "real", nullable: true),
                    CalculatedArea = table.Column<float>(type: "real", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FieldVersions_Fields_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Fields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyRelationshipTags",
                columns: table => new
                {
                    CompanyRelationshipId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyRelationshipTags", x => new { x.CompanyRelationshipId, x.TagId });
                    table.ForeignKey(
                        name: "FK_CompanyRelationshipTags_CompanyRelationships_CompanyRelatio~",
                        column: x => x.CompanyRelationshipId,
                        principalTable: "CompanyRelationships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyRelationshipTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyTags",
                columns: table => new
                {
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyTags", x => new { x.CompanyId, x.TagId });
                    table.ForeignKey(
                        name: "FK_CompanyTags_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FieldTags",
                columns: table => new
                {
                    FieldId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldTags", x => new { x.FieldId, x.TagId });
                    table.ForeignKey(
                        name: "FK_FieldTags_Fields_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Fields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FieldTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailOrderFieldInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    FieldId = table.Column<int>(type: "integer", nullable: false),
                    CropId = table.Column<int>(type: "integer", nullable: false),
                    EstimatedAcres = table.Column<float>(type: "real", nullable: false),
                    BillableAcres = table.Column<float>(type: "real", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailOrderFieldInfos", x => x.Id);
                    table.UniqueConstraint("AK_RetailOrderFieldInfos_OrderId_FieldId", x => new { x.OrderId, x.FieldId });
                    table.ForeignKey(
                        name: "FK_RetailOrderFieldInfos_Fields_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Fields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderFieldInfos_RetailOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "RetailOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderFieldInfos_Tags_CropId",
                        column: x => x.CropId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailOrderTags",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailOrderTags", x => new { x.OrderId, x.TagId });
                    table.ForeignKey(
                        name: "FK_RetailOrderTags_RetailOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "RetailOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StorageLocations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    StorageLocationTypeId = table.Column<int>(type: "integer", nullable: false),
                    ParentStorageLocationId = table.Column<int>(type: "integer", nullable: true),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    Barcode = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StorageLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StorageLocations_StorageLocations_ParentStorageLocationId",
                        column: x => x.ParentStorageLocationId,
                        principalTable: "StorageLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StorageLocations_Tags_StorageLocationTypeId",
                        column: x => x.StorageLocationTypeId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StorageLocations_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ManufacturerPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ManufacturerProductId = table.Column<int>(type: "integer", nullable: false),
                    Override = table.Column<bool>(type: "boolean", nullable: false),
                    PackageId = table.Column<int>(type: "integer", nullable: false),
                    PackagePrice = table.Column<decimal>(type: "numeric", nullable: false),
                    MapPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    MsrpPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManufacturerPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ManufacturerPrices_ManufacturerProducts_ManufacturerProduct~",
                        column: x => x.ManufacturerProductId,
                        principalTable: "ManufacturerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ManufacturerPrices_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailerPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RetailerProductId = table.Column<int>(type: "integer", nullable: false),
                    IsPriceOverridden = table.Column<bool>(type: "boolean", nullable: false),
                    PackageId = table.Column<int>(type: "integer", nullable: false),
                    PackagePrice = table.Column<decimal>(type: "numeric", nullable: false),
                    MapPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    MsrpPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailerPrices", x => x.Id);
                    table.UniqueConstraint("AK_RetailerPrices_RetailerProductId_IsPriceOverridden_PackageI~", x => new { x.RetailerProductId, x.IsPriceOverridden, x.PackageId, x.StartDate });
                    table.ForeignKey(
                        name: "FK_RetailerPrices_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailerPrices_RetailerProducts_RetailerProductId",
                        column: x => x.RetailerProductId,
                        principalTable: "RetailerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailOrderLineItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    ItemTypeId = table.Column<int>(type: "integer", nullable: false),
                    RetailerProductId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    UnitOfMeasurementId = table.Column<int>(type: "integer", nullable: true),
                    PackageId = table.Column<int>(type: "integer", nullable: true),
                    PackageQuantity = table.Column<int>(type: "integer", nullable: true),
                    Price = table.Column<float>(type: "real", nullable: false),
                    ScheduleId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailOrderLineItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetailOrderLineItems_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderLineItems_RetailOrderLineItemSchedules_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "RetailOrderLineItemSchedules",
                        principalColumn: "RetailOrderLineItemId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderLineItems_RetailOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "RetailOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderLineItems_RetailerProducts_RetailerProductId",
                        column: x => x.RetailerProductId,
                        principalTable: "RetailerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderLineItems_Tags_ItemTypeId",
                        column: x => x.ItemTypeId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderLineItems_UnitOfMeasurements_UnitOfMeasurementId",
                        column: x => x.UnitOfMeasurementId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CustomerDeliveryLocationAddresses",
                columns: table => new
                {
                    DeliveryLocationId = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    AddressType = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerDeliveryLocationAddresses", x => new { x.DeliveryLocationId, x.AddressId, x.AddressType });
                    table.ForeignKey(
                        name: "FK_CustomerDeliveryLocationAddresses_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDeliveryLocationAddresses_CustomerDeliveryLocations~",
                        column: x => x.DeliveryLocationId,
                        principalTable: "CustomerDeliveryLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CustomerDeliveryLocationPhoneNumbers",
                columns: table => new
                {
                    DeliveryLocationId = table.Column<int>(type: "integer", nullable: false),
                    PhoneNumberType = table.Column<int>(type: "integer", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerDeliveryLocationPhoneNumbers", x => new { x.DeliveryLocationId, x.PhoneNumberType });
                    table.ForeignKey(
                        name: "FK_CustomerDeliveryLocationPhoneNumbers_CustomerDeliveryLocati~",
                        column: x => x.DeliveryLocationId,
                        principalTable: "CustomerDeliveryLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailerProductComponentCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RetailerCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    RetailerProductComponentId = table.Column<int>(type: "integer", nullable: false),
                    IsCostOverridden = table.Column<bool>(type: "boolean", nullable: false),
                    PackageId = table.Column<int>(type: "integer", nullable: false),
                    PackageCost = table.Column<decimal>(type: "numeric", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RetailerProductId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailerProductComponentCosts", x => x.Id);
                    table.UniqueConstraint("AK_RetailerProductComponentCosts_RetailerProductComponentId_Is~", x => new { x.RetailerProductComponentId, x.IsCostOverridden, x.PackageId, x.StartDate });
                    table.ForeignKey(
                        name: "FK_RetailerProductComponentCosts_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailerProductComponentCosts_RetailerProductComponents_Ret~",
                        column: x => x.RetailerProductComponentId,
                        principalTable: "RetailerProductComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailerProductComponentCosts_RetailerProducts_RetailerProd~",
                        column: x => x.RetailerProductId,
                        principalTable: "RetailerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrderApprovers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PurchaseOrderId = table.Column<int>(type: "integer", nullable: false),
                    UserRoleId = table.Column<string>(type: "text", nullable: false),
                    ApprovalStatus = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrderApprovers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderApprovers_PurchaseOrders_PurchaseOrderId",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrderFees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PurchaseOrderId = table.Column<int>(type: "integer", nullable: false),
                    FeeTypeId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<float>(type: "real", nullable: false),
                    IsPercentage = table.Column<bool>(type: "boolean", nullable: false),
                    AppliedAmount = table.Column<float>(type: "real", nullable: false),
                    ApplyAfterDiscount = table.Column<bool>(type: "boolean", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrderFees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderFees_PurchaseOrders_PurchaseOrderId",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderFees_Tags_FeeTypeId",
                        column: x => x.FeeTypeId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrderLineItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PurchaseOrderId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    OrderedQty = table.Column<float>(type: "real", nullable: false),
                    ReceivedQty = table.Column<float>(type: "real", nullable: true),
                    PackageId = table.Column<int>(type: "integer", nullable: false),
                    UnitPrice = table.Column<float>(type: "real", nullable: false),
                    OrderQtyByPackage = table.Column<float>(type: "real", nullable: true),
                    ReceivedQtyByPackage = table.Column<float>(type: "real", nullable: true),
                    UnitPriceByPackage = table.Column<float>(type: "real", nullable: true),
                    BatchNumber = table.Column<string>(type: "text", nullable: true),
                    ExpectedDeliveryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateReceived = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TotalPrice = table.Column<float>(type: "real", nullable: false),
                    SdsUrl = table.Column<string>(type: "text", nullable: true),
                    RegulatoryInfo = table.Column<string>(type: "text", nullable: true),
                    SpecialHandlingInstructions = table.Column<string>(type: "text", nullable: true),
                    ReturnPolicy = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    UnitOfMeasurementId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrderLineItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderLineItems_ManufacturerProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "ManufacturerProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderLineItems_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderLineItems_PurchaseOrders_PurchaseOrderId",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderLineItems_UnitOfMeasurements_UnitOfMeasurement~",
                        column: x => x.UnitOfMeasurementId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FieldLayers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FieldVersionId = table.Column<int>(type: "integer", nullable: false),
                    ManuallyGenerated = table.Column<bool>(type: "boolean", nullable: false),
                    LayerType = table.Column<int>(type: "integer", nullable: false),
                    LayerName = table.Column<string>(type: "text", nullable: false),
                    LayerDescription = table.Column<string>(type: "text", nullable: true),
                    LayerFileName = table.Column<string>(type: "text", nullable: true),
                    GeoLocationId = table.Column<int>(type: "integer", nullable: true),
                    Area = table.Column<float>(type: "real", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    LayerGeometry = table.Column<Geometry>(type: "geometry", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldLayers", x => x.Id);
                    table.UniqueConstraint("AK_FieldLayers_FieldVersionId_LayerType_ManuallyGenerated_Laye~", x => new { x.FieldVersionId, x.LayerType, x.ManuallyGenerated, x.LayerName });
                    table.ForeignKey(
                        name: "FK_FieldLayers_FieldVersions_FieldVersionId",
                        column: x => x.FieldVersionId,
                        principalTable: "FieldVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FieldVersionTags",
                columns: table => new
                {
                    FieldVersionId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldVersionTags", x => new { x.FieldVersionId, x.TagId });
                    table.ForeignKey(
                        name: "FK_FieldVersionTags_FieldVersions_FieldVersionId",
                        column: x => x.FieldVersionId,
                        principalTable: "FieldVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FieldVersionTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailOrderComponentOverrides",
                columns: table => new
                {
                    OrderItemId = table.Column<int>(type: "integer", nullable: false),
                    OrderComponentId = table.Column<int>(type: "integer", nullable: false),
                    RetailerProductComponentId = table.Column<int>(type: "integer", nullable: false),
                    UnitOfMeasurementId = table.Column<int>(type: "integer", nullable: false),
                    MeasurementValue = table.Column<decimal>(type: "numeric", nullable: true),
                    CompositionPercentage = table.Column<decimal>(type: "numeric", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailOrderComponentOverrides", x => new { x.OrderItemId, x.OrderComponentId, x.RetailerProductComponentId });
                    table.ForeignKey(
                        name: "FK_RetailOrderComponentOverrides_RetailOrderLineItems_OrderIte~",
                        column: x => x.OrderItemId,
                        principalTable: "RetailOrderLineItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderComponentOverrides_RetailerProductComponents_Ord~",
                        column: x => x.OrderComponentId,
                        principalTable: "RetailerProductComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderComponentOverrides_UnitOfMeasurements_UnitOfMeas~",
                        column: x => x.UnitOfMeasurementId,
                        principalTable: "UnitOfMeasurements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RetailOrderItemTags",
                columns: table => new
                {
                    OrderItemId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailOrderItemTags", x => new { x.OrderItemId, x.TagId });
                    table.ForeignKey(
                        name: "FK_RetailOrderItemTags_RetailOrderLineItems_OrderItemId",
                        column: x => x.OrderItemId,
                        principalTable: "RetailOrderLineItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetailOrderItemTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryTransactionLedgerEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LedgerEntryType = table.Column<int>(type: "integer", nullable: false),
                    TransactionSubType = table.Column<int>(type: "integer", nullable: false),
                    InventoryItemId = table.Column<int>(type: "integer", nullable: false),
                    PurchaseOrderId = table.Column<int>(type: "integer", nullable: true),
                    PurchaseOrderLineItemId = table.Column<int>(type: "integer", nullable: true),
                    RetailOrderId = table.Column<int>(type: "integer", nullable: true),
                    RetailOrderLineItemId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    PackageId = table.Column<int>(type: "integer", nullable: false),
                    QuantityChangeByPackage = table.Column<float>(type: "real", nullable: false),
                    Cost = table.Column<float>(type: "real", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryTransactionLedgerEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryTransactionLedgerEntries_InventoryItems_InventoryI~",
                        column: x => x.InventoryItemId,
                        principalTable: "InventoryItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryTransactionLedgerEntries_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryTransactionLedgerEntries_PurchaseOrderLineItems_Pu~",
                        column: x => x.PurchaseOrderLineItemId,
                        principalTable: "PurchaseOrderLineItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryTransactionLedgerEntries_PurchaseOrders_PurchaseOr~",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryTransactionLedgerEntries_RetailOrderLineItems_Reta~",
                        column: x => x.RetailOrderLineItemId,
                        principalTable: "RetailOrderLineItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InventoryTransactionLedgerEntries_RetailOrders_RetailOrderId",
                        column: x => x.RetailOrderId,
                        principalTable: "RetailOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrderDiscounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PurchaseOrderId = table.Column<int>(type: "integer", nullable: false),
                    LineItemId = table.Column<int>(type: "integer", nullable: true),
                    Value = table.Column<float>(type: "real", nullable: false),
                    IsPercentage = table.Column<bool>(type: "boolean", nullable: false),
                    AppliedAmount = table.Column<float>(type: "real", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrderDiscounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderDiscounts_PurchaseOrderLineItems_LineItemId",
                        column: x => x.LineItemId,
                        principalTable: "PurchaseOrderLineItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderDiscounts_PurchaseOrders_PurchaseOrderId",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FieldLayerZones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FieldLayerId = table.Column<int>(type: "integer", nullable: false),
                    ZoneName = table.Column<string>(type: "text", nullable: false),
                    ZoneDescription = table.Column<string>(type: "text", nullable: true),
                    ZoneColor = table.Column<string>(type: "text", nullable: true),
                    ZoneOpacity = table.Column<float>(type: "real", nullable: true),
                    ZoneFileName = table.Column<string>(type: "text", nullable: true),
                    LayerZoneGeometry = table.Column<Geometry>(type: "geometry", nullable: true),
                    GeoLocationId = table.Column<int>(type: "integer", nullable: false),
                    Area = table.Column<float>(type: "real", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldLayerZones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FieldLayerZones_FieldLayers_FieldLayerId",
                        column: x => x.FieldLayerId,
                        principalTable: "FieldLayers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FieldLayerZones_GeoLocations_GeoLocationId",
                        column: x => x.GeoLocationId,
                        principalTable: "GeoLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryItemLotInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InventoryTransactionLedgerEntryId = table.Column<int>(type: "integer", nullable: false),
                    LotNumber = table.Column<string>(type: "text", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItemLotInfos", x => x.Id);
                    table.UniqueConstraint("AK_InventoryItemLotInfos_InventoryTransactionLedgerEntryId_Lot~", x => new { x.InventoryTransactionLedgerEntryId, x.LotNumber });
                    table.ForeignKey(
                        name: "FK_InventoryItemLotInfos_InventoryTransactionLedgerEntries_Inv~",
                        column: x => x.InventoryTransactionLedgerEntryId,
                        principalTable: "InventoryTransactionLedgerEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InventoryItemLotInfoBarCodeEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InventoryLotInfoId = table.Column<int>(type: "integer", nullable: false),
                    Barcode = table.Column<string>(type: "text", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryItemLotInfoBarCodeEntries", x => x.Id);
                    table.UniqueConstraint("AK_InventoryItemLotInfoBarCodeEntries_InventoryLotInfoId_Barco~", x => new { x.InventoryLotInfoId, x.Barcode });
                    table.ForeignKey(
                        name: "FK_InventoryItemLotInfoBarCodeEntries_InventoryItemLotInfos_In~",
                        column: x => x.InventoryLotInfoId,
                        principalTable: "InventoryItemLotInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BillingAccountSplitAllocations",
                columns: table => new
                {
                    SplitGroupAccountId = table.Column<int>(type: "integer", nullable: false),
                    SplitItemId = table.Column<int>(type: "integer", nullable: false),
                    SplitValue = table.Column<float>(type: "real", nullable: false),
                    SplitValueType = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingAccountSplitAllocations", x => new { x.SplitGroupAccountId, x.SplitItemId });
                });

            migrationBuilder.CreateTable(
                name: "BillingSplitGroupAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AccountCompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    SplitGroupId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingSplitGroupAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillingSplitGroupAccounts_Companies_AccountCompanyId",
                        column: x => x.AccountCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BillingSplitGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SplitGroupName = table.Column<string>(type: "text", nullable: false),
                    DefaultSplitItemId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    BillingSplitItemId = table.Column<int>(type: "integer", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingSplitGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillingSplitItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SplitGroupId = table.Column<int>(type: "integer", nullable: false),
                    ParentSplitItemId = table.Column<int>(type: "integer", nullable: true),
                    SplitTierId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingSplitItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillingSplitItems_BillingSplitGroups_SplitGroupId",
                        column: x => x.SplitGroupId,
                        principalTable: "BillingSplitGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BillingSplitItems_BillingSplitItems_ParentSplitItemId",
                        column: x => x.ParentSplitItemId,
                        principalTable: "BillingSplitItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BillingSplitItems_Tags_SplitTierId",
                        column: x => x.SplitTierId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ItemTypeId = table.Column<int>(type: "integer", nullable: false),
                    ItemId = table.Column<int>(type: "integer", nullable: false),
                    BillingSplitGroupId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseItems", x => x.Id);
                    table.UniqueConstraint("AK_EnterpriseItems_ItemId_ItemTypeId", x => new { x.ItemId, x.ItemTypeId });
                    table.ForeignKey(
                        name: "FK_EnterpriseItems_BillingSplitGroups_BillingSplitGroupId",
                        column: x => x.BillingSplitGroupId,
                        principalTable: "BillingSplitGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EnterpriseItems_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EnterpriseItems_Tags_ItemTypeId",
                        column: x => x.ItemTypeId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExternalUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExternalUserId = table.Column<string>(type: "text", nullable: false),
                    Provider = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExternalUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAddresses",
                columns: table => new
                {
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false),
                    AddressType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAddresses", x => new { x.UserId, x.AddressId });
                    table.ForeignKey(
                        name: "FK_UserAddresses_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserPhoneNumbers",
                columns: table => new
                {
                    PhoneNumberId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false),
                    PhoneNumberType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPhoneNumbers", x => new { x.UserId, x.PhoneNumberId });
                    table.ForeignKey(
                        name: "FK_UserPhoneNumbers_PhoneNumbers_PhoneNumberId",
                        column: x => x.PhoneNumberId,
                        principalTable: "PhoneNumbers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleType = table.Column<int>(type: "int", nullable: false),
                    AclOverrides = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.UniqueConstraint("AK_UserRoles_UserId_CompanyId", x => new { x.UserId, x.CompanyId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NormalizedEmail = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    DisplayName = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: true),
                    MiddleName = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    SelectedUserRoleId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_UserRoles_SelectedUserRoleId",
                        column: x => x.SelectedUserRoleId,
                        principalTable: "UserRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserSettings",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    AvatarUrl = table.Column<string>(type: "text", nullable: true),
                    AvatarFallbackUrl = table.Column<string>(type: "text", nullable: true),
                    DarkMode = table.Column<bool>(type: "boolean", nullable: true),
                    ExtendedProperties = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSettings", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_UserSettings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTags",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    xmin = table.Column<uint>(type: "xid", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTags", x => new { x.UserId, x.TagId });
                    table.ForeignKey(
                        name: "FK_UserTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserTags_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillingSplitGroupAccounts_AccountCompanyId",
                table: "BillingSplitGroupAccounts",
                column: "AccountCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingSplitGroupAccounts_SplitGroupId",
                table: "BillingSplitGroupAccounts",
                column: "SplitGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingSplitGroups_BillingSplitItemId",
                table: "BillingSplitGroups",
                column: "BillingSplitItemId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingSplitGroups_DefaultSplitItemId",
                table: "BillingSplitGroups",
                column: "DefaultSplitItemId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingSplitItems_ParentSplitItemId",
                table: "BillingSplitItems",
                column: "ParentSplitItemId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingSplitItems_SplitGroupId",
                table: "BillingSplitItems",
                column: "SplitGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingSplitItems_SplitTierId",
                table: "BillingSplitItems",
                column: "SplitTierId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_NormalizedName",
                table: "Companies",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ParentCompanyId",
                table: "Companies",
                column: "ParentCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyAddresses_AddressId",
                table: "CompanyAddresses",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyExternalServiceAccounts_CompanyId",
                table: "CompanyExternalServiceAccounts",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyFeatures_CompanyId",
                table: "CompanyFeatures",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyPhoneNumbers_PhoneNumberId",
                table: "CompanyPhoneNumbers",
                column: "PhoneNumberId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRelationshipAttachments_CompanyRelationshipId",
                table: "CompanyRelationshipAttachments",
                column: "CompanyRelationshipId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRelationships_PrimaryCompanyId",
                table: "CompanyRelationships",
                column: "PrimaryCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRelationships_RelatedCompanyId",
                table: "CompanyRelationships",
                column: "RelatedCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRelationshipTags_TagId",
                table: "CompanyRelationshipTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanySettings_DefaultPaymentTermId",
                table: "CompanySettings",
                column: "DefaultPaymentTermId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyTags_TagId",
                table: "CompanyTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDeliveryLocationAddresses_AddressId",
                table: "CustomerDeliveryLocationAddresses",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDeliveryLocations_CustomerId",
                table: "CustomerDeliveryLocations",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseItems_BillingSplitGroupId",
                table: "EnterpriseItems",
                column: "BillingSplitGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseItems_CompanyId",
                table: "EnterpriseItems",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseItems_ItemTypeId",
                table: "EnterpriseItems",
                column: "ItemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ExternalUsers_ExternalUserId",
                table: "ExternalUsers",
                column: "ExternalUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExternalUsers_UserId",
                table: "ExternalUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldLayerZones_FieldLayerId",
                table: "FieldLayerZones",
                column: "FieldLayerId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldLayerZones_GeoLocationId",
                table: "FieldLayerZones",
                column: "GeoLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Fields_GeoLocationId",
                table: "Fields",
                column: "GeoLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldTags_TagId",
                table: "FieldTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldVersions_FieldId",
                table: "FieldVersions",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldVersionTags_TagId",
                table: "FieldVersionTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_FreightRates_FreightProviderId",
                table: "FreightRates",
                column: "FreightProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_FreightRates_ZoneId",
                table: "FreightRates",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_CompanyId",
                table: "InventoryItems",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_UnitOfMeasurementId",
                table: "InventoryItems",
                column: "UnitOfMeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_WarehouseId",
                table: "InventoryItems",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryTransactionLedgerEntries_InventoryItemId",
                table: "InventoryTransactionLedgerEntries",
                column: "InventoryItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryTransactionLedgerEntries_PackageId",
                table: "InventoryTransactionLedgerEntries",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryTransactionLedgerEntries_PurchaseOrderId",
                table: "InventoryTransactionLedgerEntries",
                column: "PurchaseOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryTransactionLedgerEntries_PurchaseOrderLineItemId",
                table: "InventoryTransactionLedgerEntries",
                column: "PurchaseOrderLineItemId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryTransactionLedgerEntries_RetailOrderId",
                table: "InventoryTransactionLedgerEntries",
                column: "RetailOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryTransactionLedgerEntries_RetailOrderLineItemId",
                table: "InventoryTransactionLedgerEntries",
                column: "RetailOrderLineItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ManufacturerPrices_ManufacturerProductId",
                table: "ManufacturerPrices",
                column: "ManufacturerProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ManufacturerPrices_PackageId",
                table: "ManufacturerPrices",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_ManufacturerProducts_CompanyId",
                table: "ManufacturerProducts",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ManufacturerProducts_ManufacturerCompanyId",
                table: "ManufacturerProducts",
                column: "ManufacturerCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ManufacturerProducts_NormalizedName",
                table: "ManufacturerProducts",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Packages_BasePackageId",
                table: "Packages",
                column: "BasePackageId");

            migrationBuilder.CreateIndex(
                name: "IX_Packages_NormalizedName",
                table: "Packages",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Packages_UnitId",
                table: "Packages",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAvailabilities_ProductId",
                table: "ProductAvailabilities",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductDocuments_ProductId",
                table: "ProductDocuments",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderApprovers_PurchaseOrderId",
                table: "PurchaseOrderApprovers",
                column: "PurchaseOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderDiscounts_LineItemId",
                table: "PurchaseOrderDiscounts",
                column: "LineItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderDiscounts_PurchaseOrderId",
                table: "PurchaseOrderDiscounts",
                column: "PurchaseOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderFees_FeeTypeId",
                table: "PurchaseOrderFees",
                column: "FeeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderFees_PurchaseOrderId",
                table: "PurchaseOrderFees",
                column: "PurchaseOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderLineItems_PackageId",
                table: "PurchaseOrderLineItems",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderLineItems_ProductId",
                table: "PurchaseOrderLineItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderLineItems_PurchaseOrderId",
                table: "PurchaseOrderLineItems",
                column: "PurchaseOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderLineItems_UnitOfMeasurementId",
                table: "PurchaseOrderLineItems",
                column: "UnitOfMeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_BillingAccountId",
                table: "PurchaseOrders",
                column: "BillingAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_PaymentTermsId",
                table: "PurchaseOrders",
                column: "PaymentTermsId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_RetailOrderId",
                table: "PurchaseOrders",
                column: "RetailOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_VendorCompanyId",
                table: "PurchaseOrders",
                column: "VendorCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Rebates_RebateConditionId",
                table: "Rebates",
                column: "RebateConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailerPrices_PackageId",
                table: "RetailerPrices",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailerProductComponentCosts_PackageId",
                table: "RetailerProductComponentCosts",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailerProductComponentCosts_RetailerProductId",
                table: "RetailerProductComponentCosts",
                column: "RetailerProductId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailerProductComponents_ManufacturerProductId",
                table: "RetailerProductComponents",
                column: "ManufacturerProductId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailerProductComponents_UnitOfMeasurementId",
                table: "RetailerProductComponents",
                column: "UnitOfMeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailerProducts_NormalizedName",
                table: "RetailerProducts",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RetailerProducts_RetailerCompanyId",
                table: "RetailerProducts",
                column: "RetailerCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderComponentOverrides_OrderComponentId",
                table: "RetailOrderComponentOverrides",
                column: "OrderComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderComponentOverrides_UnitOfMeasurementId",
                table: "RetailOrderComponentOverrides",
                column: "UnitOfMeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderFieldInfos_CropId",
                table: "RetailOrderFieldInfos",
                column: "CropId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderFieldInfos_FieldId",
                table: "RetailOrderFieldInfos",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderItemTags_TagId",
                table: "RetailOrderItemTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderLineItems_ItemTypeId",
                table: "RetailOrderLineItems",
                column: "ItemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderLineItems_OrderId",
                table: "RetailOrderLineItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderLineItems_PackageId",
                table: "RetailOrderLineItems",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderLineItems_RetailerProductId",
                table: "RetailOrderLineItems",
                column: "RetailerProductId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderLineItems_ScheduleId",
                table: "RetailOrderLineItems",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderLineItems_UnitOfMeasurementId",
                table: "RetailOrderLineItems",
                column: "UnitOfMeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrders_CustomerCompanyId",
                table: "RetailOrders",
                column: "CustomerCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RetailOrderTags_TagId",
                table: "RetailOrderTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_StorageLocations_ParentStorageLocationId",
                table: "StorageLocations",
                column: "ParentStorageLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_StorageLocations_StorageLocationTypeId",
                table: "StorageLocations",
                column: "StorageLocationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_StorageLocations_WarehouseId",
                table: "StorageLocations",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_TagCategories_NormalizedName",
                table: "TagCategories",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_TagCategoryId_NormalizedName",
                table: "Tags",
                columns: new[] { "TagCategoryId", "NormalizedName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TransactionJournalEntries_BillingAccountId",
                table: "TransactionJournalEntries",
                column: "BillingAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasurements_BaseUnitId",
                table: "UnitOfMeasurements",
                column: "BaseUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasurements_DenominatorUnitId",
                table: "UnitOfMeasurements",
                column: "DenominatorUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasurements_NormalizedName",
                table: "UnitOfMeasurements",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasurements_NumeratorUnitId",
                table: "UnitOfMeasurements",
                column: "NumeratorUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAddresses_AddressId",
                table: "UserAddresses",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_UserInvites_CompanyId",
                table: "UserInvites",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserInvites_NormalizedEmail",
                table: "UserInvites",
                column: "NormalizedEmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserPhoneNumbers_PhoneNumberId",
                table: "UserPhoneNumbers",
                column: "PhoneNumberId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_CompanyId",
                table: "UserRoles",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_NormalizedEmail",
                table: "Users",
                column: "NormalizedEmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SelectedUserRoleId",
                table: "Users",
                column: "SelectedUserRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTags_TagId",
                table: "UserTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseAddresses_AddressId",
                table: "WarehouseAddresses",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_WarehousePhoneNumbers_PhoneNumberId",
                table: "WarehousePhoneNumbers",
                column: "PhoneNumberId");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouses_RetailerCompanyId",
                table: "Warehouses",
                column: "RetailerCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_BillingAccountSplitAllocations_BillingSplitItems_SplitGroup~",
                table: "BillingAccountSplitAllocations",
                column: "SplitGroupAccountId",
                principalTable: "BillingSplitItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BillingSplitGroupAccounts_BillingSplitGroups_SplitGroupId",
                table: "BillingSplitGroupAccounts",
                column: "SplitGroupId",
                principalTable: "BillingSplitGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BillingSplitGroups_BillingSplitItems_BillingSplitItemId",
                table: "BillingSplitGroups",
                column: "BillingSplitItemId",
                principalTable: "BillingSplitItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BillingSplitGroups_BillingSplitItems_DefaultSplitItemId",
                table: "BillingSplitGroups",
                column: "DefaultSplitItemId",
                principalTable: "BillingSplitItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExternalUsers_Users_UserId",
                table: "ExternalUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAddresses_Users_UserId",
                table: "UserAddresses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPhoneNumbers_Users_UserId",
                table: "UserPhoneNumbers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BillingSplitGroups_BillingSplitItems_BillingSplitItemId",
                table: "BillingSplitGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_BillingSplitGroups_BillingSplitItems_DefaultSplitItemId",
                table: "BillingSplitGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Companies_CompanyId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles");

            migrationBuilder.DropTable(
                name: "BillingAccountSplitAllocations");

            migrationBuilder.DropTable(
                name: "BillingSplitGroupAccounts");

            migrationBuilder.DropTable(
                name: "CompanyAddresses");

            migrationBuilder.DropTable(
                name: "CompanyExternalServiceAccounts");

            migrationBuilder.DropTable(
                name: "CompanyFeatures");

            migrationBuilder.DropTable(
                name: "CompanyPhoneNumbers");

            migrationBuilder.DropTable(
                name: "CompanyRelationshipAttachments");

            migrationBuilder.DropTable(
                name: "CompanyRelationshipTags");

            migrationBuilder.DropTable(
                name: "CompanySettings");

            migrationBuilder.DropTable(
                name: "CompanyTags");

            migrationBuilder.DropTable(
                name: "CustomerDeliveryLocationAddresses");

            migrationBuilder.DropTable(
                name: "CustomerDeliveryLocationPhoneNumbers");

            migrationBuilder.DropTable(
                name: "EnterpriseItems");

            migrationBuilder.DropTable(
                name: "ExternalUsers");

            migrationBuilder.DropTable(
                name: "FieldLayerZones");

            migrationBuilder.DropTable(
                name: "FieldTags");

            migrationBuilder.DropTable(
                name: "FieldVersionTags");

            migrationBuilder.DropTable(
                name: "FreightRates");

            migrationBuilder.DropTable(
                name: "InventoryItemLotInfoBarCodeEntries");

            migrationBuilder.DropTable(
                name: "ManufacturerPrices");

            migrationBuilder.DropTable(
                name: "ProductAvailabilities");

            migrationBuilder.DropTable(
                name: "ProductDocuments");

            migrationBuilder.DropTable(
                name: "PurchaseOrderApprovers");

            migrationBuilder.DropTable(
                name: "PurchaseOrderDiscounts");

            migrationBuilder.DropTable(
                name: "PurchaseOrderFees");

            migrationBuilder.DropTable(
                name: "Rebates");

            migrationBuilder.DropTable(
                name: "RetailerPrices");

            migrationBuilder.DropTable(
                name: "RetailerProductComponentCosts");

            migrationBuilder.DropTable(
                name: "RetailerProductDiscounts");

            migrationBuilder.DropTable(
                name: "RetailOrderComponentOverrides");

            migrationBuilder.DropTable(
                name: "RetailOrderFieldInfos");

            migrationBuilder.DropTable(
                name: "RetailOrderItemTags");

            migrationBuilder.DropTable(
                name: "RetailOrderTags");

            migrationBuilder.DropTable(
                name: "StorageLocations");

            migrationBuilder.DropTable(
                name: "TransactionJournalEntries");

            migrationBuilder.DropTable(
                name: "UserAddresses");

            migrationBuilder.DropTable(
                name: "UserInvites");

            migrationBuilder.DropTable(
                name: "UserPhoneNumbers");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.DropTable(
                name: "UserTags");

            migrationBuilder.DropTable(
                name: "WarehouseAddresses");

            migrationBuilder.DropTable(
                name: "WarehousePhoneNumbers");

            migrationBuilder.DropTable(
                name: "CustomerDeliveryLocations");

            migrationBuilder.DropTable(
                name: "FieldLayers");

            migrationBuilder.DropTable(
                name: "FreightProviders");

            migrationBuilder.DropTable(
                name: "FreightRateZones");

            migrationBuilder.DropTable(
                name: "InventoryItemLotInfos");

            migrationBuilder.DropTable(
                name: "RebateCondition");

            migrationBuilder.DropTable(
                name: "RetailerProductComponents");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "PhoneNumbers");

            migrationBuilder.DropTable(
                name: "CompanyRelationships");

            migrationBuilder.DropTable(
                name: "FieldVersions");

            migrationBuilder.DropTable(
                name: "InventoryTransactionLedgerEntries");

            migrationBuilder.DropTable(
                name: "Fields");

            migrationBuilder.DropTable(
                name: "InventoryItems");

            migrationBuilder.DropTable(
                name: "PurchaseOrderLineItems");

            migrationBuilder.DropTable(
                name: "RetailOrderLineItems");

            migrationBuilder.DropTable(
                name: "GeoLocations");

            migrationBuilder.DropTable(
                name: "Warehouses");

            migrationBuilder.DropTable(
                name: "ManufacturerProducts");

            migrationBuilder.DropTable(
                name: "PurchaseOrders");

            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "RetailOrderLineItemSchedules");

            migrationBuilder.DropTable(
                name: "RetailerProducts");

            migrationBuilder.DropTable(
                name: "BillingAccounts");

            migrationBuilder.DropTable(
                name: "PaymentTerms");

            migrationBuilder.DropTable(
                name: "RetailOrders");

            migrationBuilder.DropTable(
                name: "UnitOfMeasurements");

            migrationBuilder.DropTable(
                name: "BillingSplitItems");

            migrationBuilder.DropTable(
                name: "BillingSplitGroups");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "TagCategories");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserRoles");
        }
    }
}
