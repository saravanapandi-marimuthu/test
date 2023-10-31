-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'BUSINESS', 'BILLING', 'SHIPPING', 'PHYSICAL', 'MAILING', 'SERVICE', 'RECIPIENT', 'LEGAL', 'OTHER');

-- CreateEnum
CREATE TYPE "PhoneNumberType" AS ENUM ('MOBILE', 'WORK', 'HOME', 'OTHER');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('SIMPLE', 'COMPOUND');

-- CreateEnum
CREATE TYPE "OrderStatusType" AS ENUM ('PENDING', 'IN_PROGRESS', 'FULFILLED', 'CANCELED');

-- CreateEnum
CREATE TYPE "OrderItemStatusType" AS ENUM ('PENDING', 'BOOKED', 'PICK_TICKET_READY', 'PICK_TICKET_IN_PROGRESS', 'DELIVERY_TICKET_READY', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('STOCK_ADDED', 'STOCK_REMOVED');

-- CreateEnum
CREATE TYPE "StorageUnitType" AS ENUM ('CONTAINER', 'BIN', 'TANK');

-- CreateEnum
CREATE TYPE "AssetStatusType" AS ENUM ('ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE');

-- CreateEnum
CREATE TYPE "CompanyRelationshipDirection" AS ENUM ('FIRST_TO_SECOND_COMPANY', 'SECOND_TO_FIRST_COMPANY');

-- CreateEnum
CREATE TYPE "CompanyRelationshipStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserAuditLogType" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "BoundaryType" AS ENUM ('MANUAL', 'MACHINE');

-- CreateEnum
CREATE TYPE "BillingSplitValueType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT', 'RATIO');

-- CreateEnum
CREATE TYPE "BillingAccountStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UnitOfMeasurementType" AS ENUM ('VOLUME', 'WEIGHT', 'AREA', 'LENGTH', 'COUNT', 'RATE');

-- CreateEnum
CREATE TYPE "ChartOfAccountClassification" AS ENUM ('ASSET', 'EQUITY', 'EXPENSE', 'LIABILITY', 'REVENUE');

-- CreateEnum
CREATE TYPE "ChartOfAccountType" AS ENUM ('BANK', 'OTHER_CURRENT_ASSET', 'FIXED_ASSET', 'OTHER_ASSET', 'ACCOUNTS_RECEIVABLE', 'EQUITY', 'EXPENSE', 'COST_OF_GOODS_SOLD', 'OTHER_EXPENSE', 'ACCOUNTS_PAYABLE', 'CREDIT_CARD', 'OTHER_CURRENT_LIABILITY', 'LONG_TERM_LIABILITY', 'REVENUE', 'OTHER_INCOME');

-- CreateTable
CREATE TABLE "PaymentTerm" (
    "id" SERIAL NOT NULL,
    "normalized_payment_term" TEXT NOT NULL,
    "payment_term" TEXT NOT NULL,
    "due_days" INTEGER NOT NULL,
    "discount_percent" DOUBLE PRECISION,
    "discount_days" INTEGER,
    "description" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagCategory" (
    "id" SERIAL NOT NULL,
    "normalized_category_name" TEXT NOT NULL,
    "tag_category_name" TEXT NOT NULL,
    "color_index" INTEGER,
    "color" TEXT,
    "icon" TEXT,
    "description" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TagCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "normalized_tag_name" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "color_index" INTEGER,
    "color" TEXT,
    "icon" TEXT,
    "description" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tag_category_id" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taxonomy" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT '11111111-1111-1111-1111-111111111111',
    "normalized_taxonomy_name" TEXT NOT NULL,
    "taxonomy_name" TEXT NOT NULL,
    "description" TEXT,
    "parent_taxonomy_id" INTEGER NOT NULL DEFAULT 0,
    "taxonomy_level" INTEGER NOT NULL,
    "color_index" INTEGER,
    "color" TEXT,
    "icon_name" TEXT,
    "icon_url" TEXT,
    "editable" BOOLEAN,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInvite" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "invite_token" TEXT NOT NULL,
    "invited_by_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAudit" (
    "id" SERIAL NOT NULL,
    "table_name" TEXT NOT NULL,
    "action" "UserAuditLogType" NOT NULL,
    "changed_by" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old_value" JSONB,
    "new_value" JSONB NOT NULL,

    CONSTRAINT "UserAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "last_updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "display_name" TEXT,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalUser" (
    "id" SERIAL NOT NULL,
    "external_user_id" TEXT NOT NULL,
    "provider" TEXT,
    "userId" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAddress" (
    "user_id" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "address_type" "AddressType" NOT NULL,
    "last_updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("user_id","address_id","address_type")
);

-- CreateTable
CREATE TABLE "UserPhoneNumber" (
    "user_id" TEXT NOT NULL,
    "phone_number_type" "PhoneNumberType" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "last_updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPhoneNumber_pkey" PRIMARY KEY ("user_id","phone_number_type")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "user_id" TEXT NOT NULL,
    "avatar_url" TEXT,
    "avatar_fallback_image" TEXT,
    "dark_mode" BOOLEAN NOT NULL,
    "selectedUserRoleId" TEXT,
    "additional_settings" JSONB NOT NULL DEFAULT '{}',
    "last_updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "CompanyType" (
    "id" SERIAL NOT NULL,
    "company_type_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "color_id" INTEGER,
    "color" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "normalized_company_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_short_name" TEXT,
    "company_type_id" INTEGER NOT NULL,
    "parent_company_id" TEXT,
    "homepage" TEXT,
    "logo_url" TEXT,
    "notes" TEXT,
    "extended_properties" JSONB NOT NULL DEFAULT '{}',
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyTag" (
    "company_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyTag_pkey" PRIMARY KEY ("company_id","tag_id")
);

-- CreateTable
CREATE TABLE "CompanyAddress" (
    "company_id" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "address_type" "AddressType" NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyAddress_pkey" PRIMARY KEY ("company_id","address_id","address_type")
);

-- CreateTable
CREATE TABLE "CompanyPhoneNumber" (
    "company_id" TEXT NOT NULL,
    "phone_number_type" "PhoneNumberType" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyPhoneNumber_pkey" PRIMARY KEY ("company_id","phone_number_type")
);

-- CreateTable
CREATE TABLE "CompanySaaSFeature" (
    "company_id" TEXT NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "enabled" BOOLEAN,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanySaaSFeature_pkey" PRIMARY KEY ("company_id","feature_id")
);

-- CreateTable
CREATE TABLE "CompanyRelationshipType" (
    "id" SERIAL NOT NULL,
    "company_relationship_type_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "color_id" INTEGER,
    "color" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyRelationshipType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRelationship" (
    "id" TEXT NOT NULL,
    "first_company_id" TEXT NOT NULL,
    "second_company_id" TEXT NOT NULL,
    "company_relationship_type_id" INTEGER NOT NULL,
    "company_relationship_status" "CompanyRelationshipStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "extended_properties" JSONB NOT NULL DEFAULT '{}',
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRelationshipAttachment" (
    "id" SERIAL NOT NULL,
    "company_relationship_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyRelationshipAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedCompany" (
    "id" SERIAL NOT NULL,
    "first_company_id" TEXT NOT NULL,
    "second_company_id" TEXT NOT NULL,
    "company_relationship_type_id" INTEGER NOT NULL,
    "company_relationship_direction" "CompanyRelationshipDirection" NOT NULL DEFAULT 'FIRST_TO_SECOND_COMPANY',
    "company_relationship_id" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelatedCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRelationshipTag" (
    "company_relationship_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyRelationshipTag_pkey" PRIMARY KEY ("company_relationship_id","tag_id")
);

-- CreateTable
CREATE TABLE "CustomerDeliveryLocation" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "delivery_location_name" TEXT NOT NULL,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerDeliveryLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerDeliveryLocationAddress" (
    "delivery_location_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "address_type" "AddressType" NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerDeliveryLocationAddress_pkey" PRIMARY KEY ("delivery_location_id","address_id","address_type")
);

-- CreateTable
CREATE TABLE "CustomerDeliveryLocationPhoneNumber" (
    "delivery_location_id" INTEGER NOT NULL,
    "phone_number_type" "PhoneNumberType" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerDeliveryLocationPhoneNumber_pkey" PRIMARY KEY ("delivery_location_id","phone_number_type")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "acl" TEXT,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyServiceAccount" (
    "id" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyServiceAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "external_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_type_id" INTEGER,
    "upc" TEXT,
    "product_sku" TEXT,
    "bar_code" TEXT,
    "label_dat" TEXT NOT NULL,
    "logo_id" INTEGER NOT NULL,
    "man_id" INTEGER NOT NULL,
    "EPA" TEXT NOT NULL,
    "manufacturer_name" TEXT NOT NULL,
    "common_name" TEXT NOT NULL,
    "has_icon" BOOLEAN NOT NULL,
    "icon_url" TEXT NOT NULL,
    "icon_ui" TEXT NOT NULL,
    "ga_page_param" TEXT NOT NULL,
    "is_us" BOOLEAN NOT NULL,
    "is_canada" BOOLEAN NOT NULL,
    "is_co_pack" BOOLEAN NOT NULL,
    "manufacturer_id" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTag" (
    "product_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("product_id","tag_id")
);

-- CreateTable
CREATE TABLE "ProductAvailability" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDocument" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "site_url" TEXT NOT NULL,
    "label_folder" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "doc_type" TEXT NOT NULL,
    "doc_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCost" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitOfMeasurement" (
    "id" SERIAL NOT NULL,
    "base_unit_id" INTEGER,
    "unit_name" TEXT NOT NULL,
    "singular_name" TEXT,
    "plural_name" TEXT,
    "unit_of_measurement_type" "UnitOfMeasurementType",
    "conversion_factor" DOUBLE PRECISION DEFAULT 1.0,
    "numerator_unit_id" INTEGER,
    "numerator_unit_type" "UnitOfMeasurementType",
    "numerator_multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "denominator_unit_id" INTEGER,
    "denominator_unit_type" "UnitOfMeasurementType",
    "denominator_multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "color_index" INTEGER,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitOfMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "package_name" TEXT NOT NULL,
    "description" TEXT,
    "base_package_id" INTEGER,
    "unit_of_measurement_id" INTEGER NOT NULL,
    "color_id" INTEGER,
    "quantity" DOUBLE PRECISION NOT NULL,
    "quantity_in_base_unit" DOUBLE PRECISION NOT NULL,
    "package_type_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversionFactor" (
    "id" SERIAL NOT NULL,
    "from_unit" INTEGER NOT NULL,
    "to_unit" INTEGER NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConversionFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManufacturerPrice" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "msrp" DOUBLE PRECISION NOT NULL,
    "map" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManufacturerPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailerProduct" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_type_id" INTEGER,
    "product_sku" TEXT NOT NULL,
    "product_image_url" TEXT,
    "product_catalog_url" TEXT,
    "product_description" TEXT,
    "label" TEXT,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailerProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailerProductTag" (
    "retailer_product_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailerProductTag_pkey" PRIMARY KEY ("retailer_product_id","tag_id")
);

-- CreateTable
CREATE TABLE "RetailerProductComponent" (
    "id" SERIAL NOT NULL,
    "retailer_product_id" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "measurement_value" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailerProductComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailPrice" (
    "id" SERIAL NOT NULL,
    "retailer_product_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rebate" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "rebate_name" TEXT NOT NULL,
    "rebate_type_id" INTEGER NOT NULL,
    "rebate_value" DOUBLE PRECISION NOT NULL,
    "rebate_value_type" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rebate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "retailer_product_id" INTEGER,
    "discount_name" TEXT NOT NULL,
    "discount_type_id" INTEGER NOT NULL,
    "discount_value" DOUBLE PRECISION NOT NULL,
    "discount_value_type" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "warehouse_name" TEXT NOT NULL,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarehouseTag" (
    "warehouse_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehouseTag_pkey" PRIMARY KEY ("warehouse_id","tag_id")
);

-- CreateTable
CREATE TABLE "WarehouseAddress" (
    "warehouse_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "address_type" "AddressType" NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehouseAddress_pkey" PRIMARY KEY ("warehouse_id","address_id","address_type")
);

-- CreateTable
CREATE TABLE "WarehousePhoneNumber" (
    "warehouse_id" INTEGER NOT NULL,
    "phone_number_type" "PhoneNumberType" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehousePhoneNumber_pkey" PRIMARY KEY ("warehouse_id","phone_number_type")
);

-- CreateTable
CREATE TABLE "StorageLocation" (
    "id" SERIAL NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "storage_type_id" INTEGER NOT NULL,
    "parentId" INTEGER,
    "identifier" TEXT,
    "barcode" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorageLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "order_number" TEXT NOT NULL,
    "vendorCompanyId" INTEGER NOT NULL,
    "purchase_order_status_id" INTEGER NOT NULL,
    "date_ordered" TIMESTAMP(3) NOT NULL,
    "expected_delivery_date" TIMESTAMP(3),
    "date_received" TIMESTAMP(3),
    "total_price" DOUBLE PRECISION NOT NULL,
    "payment_terms_id" INTEGER NOT NULL,
    "tracking_number" TEXT,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderLineItem" (
    "id" SERIAL NOT NULL,
    "purchase_order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "ordered_qty" DOUBLE PRECISION NOT NULL,
    "received_qty" DOUBLE PRECISION,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "unit_of_measurement_id" INTEGER NOT NULL,
    "order_qty_by_package" DOUBLE PRECISION,
    "received_qty_by_package" DOUBLE PRECISION,
    "unit_price_by_package" DOUBLE PRECISION,
    "package_id" INTEGER,
    "batch_number" TEXT,
    "expected_delivery_date" TIMESTAMP(3),
    "date_received" TIMESTAMP(3),
    "total_price" DOUBLE PRECISION NOT NULL,
    "sds_url" TEXT,
    "regulatory_info" TEXT,
    "special_handling_instructions" TEXT,
    "return_policy" TEXT,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrderLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderFee" (
    "id" SERIAL NOT NULL,
    "purchase_order_id" INTEGER NOT NULL,
    "fee_type_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "is_percentage" BOOLEAN NOT NULL,
    "applied_amount" DOUBLE PRECISION NOT NULL,
    "apply_after_discount" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrderFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderDiscount" (
    "id" SERIAL NOT NULL,
    "purchase_order_id" INTEGER NOT NULL,
    "line_item_id" INTEGER,
    "value" DOUBLE PRECISION NOT NULL,
    "is_percentage" BOOLEAN NOT NULL,
    "applied_amount" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrderDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderApproval" (
    "id" SERIAL NOT NULL,
    "purchase_order_id" INTEGER NOT NULL,
    "user_role_id" TEXT NOT NULL,
    "approvalStatus" "ApprovalStatus" NOT NULL,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrderApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "storage_location_id" INTEGER,
    "company_id" TEXT NOT NULL,
    "total_quantity" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "unit_of_measurement_id" INTEGER NOT NULL,
    "package_id" INTEGER,
    "number_of_packages" INTEGER,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItemBarcode" (
    "id" SERIAL NOT NULL,
    "inventoryItemId" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItemBarcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryTransactionSubType" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT '11111111-1111-1111-1111-111111111111',
    "sub_type_name" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryTransactionSubType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryLedgerEntry" (
    "id" SERIAL NOT NULL,
    "transactionSubTypeId" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    "inventory_item_id" INTEGER NOT NULL,
    "purchase_order_id" INTEGER,
    "purchase_order_line_item_id" INTEGER,
    "retail_order_id" INTEGER,
    "retail_order_line_item_id" INTEGER,
    "barcode" TEXT,
    "lotNumber" TEXT,
    "quantity_change" DOUBLE PRECISION NOT NULL,
    "quantity_change_by_base_uom" DOUBLE PRECISION,
    "cost" DOUBLE PRECISION,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,

    CONSTRAINT "InventoryLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailOrder" (
    "id" SERIAL NOT NULL,
    "sourceCompanyId" TEXT NOT NULL,
    "customerCompanyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatusType" NOT NULL,
    "order_type_id" INTEGER NOT NULL,

    CONSTRAINT "RetailOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailOrderTag" (
    "order_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailOrderTag_pkey" PRIMARY KEY ("order_id","tag_id")
);

-- CreateTable
CREATE TABLE "RetailOrderLineItem" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "order_type_id" INTEGER NOT NULL,
    "retailer_product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "schedule_id" INTEGER,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "OrderItemStatusType" NOT NULL,

    CONSTRAINT "RetailOrderLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItemTag" (
    "order_item_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItemTag_pkey" PRIMARY KEY ("order_item_id","tag_id")
);

-- CreateTable
CREATE TABLE "OrderComponentOverride" (
    "order_item_id" INTEGER NOT NULL,
    "order_component_id" INTEGER NOT NULL,
    "retailer_product_component_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderComponentOverride_pkey" PRIMARY KEY ("order_item_id","order_component_id","retailer_product_component_id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "schedule_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnterpriseItem" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "item_type_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "billing_split_group_id" INTEGER,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnterpriseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingSplitGroup" (
    "id" SERIAL NOT NULL,
    "split_group_name" TEXT NOT NULL,
    "billing_split_item_id" INTEGER,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingSplitGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingSplitGroupAccount" (
    "id" SERIAL NOT NULL,
    "account_company_id" TEXT NOT NULL,
    "split_group_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingSplitGroupAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingSplitItem" (
    "id" SERIAL NOT NULL,
    "split_group_id" INTEGER NOT NULL,
    "parent_split_item_id" INTEGER,
    "split_level_id" INTEGER NOT NULL,
    "split_item_id" INTEGER,

    CONSTRAINT "BillingSplitItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingAccountSplitAllocation" (
    "split_group_account_id" INTEGER NOT NULL,
    "split_item_id" INTEGER NOT NULL,
    "split_value" DOUBLE PRECISION NOT NULL,
    "split_type" "BillingSplitValueType" NOT NULL DEFAULT 'PERCENTAGE',
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingAccountSplitAllocation_pkey" PRIMARY KEY ("split_group_account_id","split_item_id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "field_name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "geo_location_id" INTEGER,
    "plss_location" TEXT,
    "plss_location_state" TEXT,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldTag" (
    "field_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldTag_pkey" PRIMARY KEY ("field_id","tag_id")
);

-- CreateTable
CREATE TABLE "FieldVersion" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,
    "field_id" INTEGER NOT NULL,
    "estimated_area" DOUBLE PRECISION,
    "calculated_area" DOUBLE PRECISION,
    "notes" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldVersionTag" (
    "field_version_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldVersionTag_pkey" PRIMARY KEY ("field_version_id","tag_id")
);

-- CreateTable
CREATE TABLE "FieldLayer" (
    "id" SERIAL NOT NULL,
    "field_id" INTEGER NOT NULL,
    "manually_generated" BOOLEAN NOT NULL,
    "layer_type_id" INTEGER NOT NULL,
    "layer_name" TEXT NOT NULL,
    "layer_description" TEXT,
    "layer_file_name" TEXT,
    "geo_json_data" JSONB,
    "geo_location_id" INTEGER,
    "area" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldLayerZone" (
    "id" SERIAL NOT NULL,
    "field_layer_id" INTEGER NOT NULL,
    "zone_name" TEXT NOT NULL,
    "zone_description" TEXT,
    "zone_color" TEXT,
    "zone_opacity" DOUBLE PRECISION,
    "zone_file_name" TEXT,
    "geo_json_data" JSONB,
    "geo_location_id" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldLayerZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowingSeason" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "planting_date" TIMESTAMP(3),
    "harvest_date" TIMESTAMP(3),
    "cropYear" INTEGER NOT NULL,
    "crop_id" INTEGER NOT NULL,
    "subfieldId" INTEGER NOT NULL,
    "yield_goal" DOUBLE PRECISION,
    "yield_goal_measurement_id" INTEGER,
    "yield" DOUBLE PRECISION,
    "yield_measurement_id" INTEGER,
    "notes" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrowingSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowingSeasonTag" (
    "growing_season_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrowingSeasonTag_pkey" PRIMARY KEY ("growing_season_id","tag_id")
);

-- CreateTable
CREATE TABLE "GeoLocation" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION,
    "accuracy" DOUBLE PRECISION,
    "source" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "GeoLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetCategory" (
    "id" SERIAL NOT NULL,
    "asset_category_name" TEXT NOT NULL,
    "description" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceLog" (
    "id" SERIAL NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "performed_by_id" TEXT NOT NULL,
    "maintenance_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "cost" DOUBLE PRECISION,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "asset_name" TEXT NOT NULL,
    "description" TEXT,
    "asset_category_id" INTEGER NOT NULL,
    "assetLocation" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "cost" DOUBLE PRECISION,
    "serial_number" TEXT,
    "status" "AssetStatusType" NOT NULL,
    "assigned_to_id" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetCapacity" (
    "asset_id" INTEGER NOT NULL,
    "sub_unit_id" INTEGER NOT NULL,
    "asset_value" DOUBLE PRECISION NOT NULL,
    "last_updated_by" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "number_of_storage_units" INTEGER NOT NULL,
    "storage_unit_capacity" DOUBLE PRECISION NOT NULL,
    "unit_of_measurement_id" INTEGER NOT NULL,

    CONSTRAINT "AssetCapacity_pkey" PRIMARY KEY ("asset_id","sub_unit_id")
);

-- CreateTable
CREATE TABLE "InstantMessage" (
    "id" SERIAL NOT NULL,
    "parent_communication_id" INTEGER,
    "company_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "public" BOOLEAN,
    "customer_id" TEXT,
    "order_id" INTEGER,
    "message" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "edited" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstantMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstantMessageAttachment" (
    "id" SERIAL NOT NULL,
    "instant_message_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstantMessageAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingAccount" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_number" TEXT,
    "account_type_id" INTEGER NOT NULL,
    "account_sub_type_id" INTEGER,
    "account_status_id" "BillingAccountStatus" NOT NULL,
    "external_account_id" TEXT,
    "external_account_name" TEXT,
    "external_sub_account_name" TEXT,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionJournalEntry" (
    "id" SERIAL NOT NULL,
    "billing_account_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionJournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionJournalEntryLine" (
    "id" SERIAL NOT NULL,
    "billing_account_id" INTEGER NOT NULL,
    "journal_entry_id" INTEGER NOT NULL,
    "debit" DECIMAL(65,30) DEFAULT 0,
    "credit" DECIMAL(65,30) DEFAULT 0,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionJournalEntryLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutrientRemovalRate" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL DEFAULT '11111111-1111-1111-1111-111111111111',
    "crop_id" INTEGER NOT NULL,
    "year_id" INTEGER NOT NULL,
    "nutrient_id" INTEGER NOT NULL,
    "is_dry_matter" BOOLEAN NOT NULL DEFAULT false,
    "is_silage" BOOLEAN NOT NULL DEFAULT false,
    "water_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "removal_rate_value" DOUBLE PRECISION NOT NULL,
    "removal_rate_unit_id" INTEGER NOT NULL,
    "extended_properties" JSONB,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutrientRemovalRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "currency_name" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "rounding_factor" INTEGER NOT NULL,
    "currency_symbol" TEXT,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartOfAccount" (
    "id" SERIAL NOT NULL,
    "parent_account_id" INTEGER,
    "company_id" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "fully_qualified_name" TEXT,
    "account_classification" "ChartOfAccountClassification" NOT NULL,
    "account_type" "ChartOfAccountType" NOT NULL,
    "account_sub_type_id" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sparse" BOOLEAN NOT NULL DEFAULT false,
    "currency_id" INTEGER NOT NULL,
    "notes" TEXT,
    "extended_properties" JSONB,
    "current_balance" DOUBLE PRECISION,
    "current_balance_with_sub_accounts" DOUBLE PRECISION,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChartOfAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartOfAccountSubType" (
    "id" SERIAL NOT NULL,
    "account_type_id" "ChartOfAccountType" NOT NULL,
    "account_sub_type_name" TEXT NOT NULL,
    "account_sub_type_number" TEXT NOT NULL,
    "last_updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChartOfAccountSubType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTerm_normalized_payment_term_due_days_key" ON "PaymentTerm"("normalized_payment_term", "due_days");

-- CreateIndex
CREATE UNIQUE INDEX "TagCategory_normalized_category_name_key" ON "TagCategory"("normalized_category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_normalized_tag_name_tag_category_id_key" ON "Tag"("normalized_tag_name", "tag_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Taxonomy_normalized_taxonomy_name_taxonomy_level_parent_tax_key" ON "Taxonomy"("normalized_taxonomy_name", "taxonomy_level", "parent_taxonomy_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInvite_email_company_id_role_id_key" ON "UserInvite"("email", "company_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalUser_external_user_id_key" ON "ExternalUser"("external_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyType_company_type_name_key" ON "CompanyType"("company_type_name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_normalized_company_name_key" ON "Company"("normalized_company_name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRelationshipType_company_relationship_type_name_key" ON "CompanyRelationshipType"("company_relationship_type_name");

-- CreateIndex
CREATE INDEX "CompanyRelationship_FirstCompanyRelationshipUniqueIndex" ON "CompanyRelationship"("first_company_id", "company_relationship_type_id");

-- CreateIndex
CREATE INDEX "CompanyRelationship_SecondCompanyRelationshipUniqueIndex" ON "CompanyRelationship"("second_company_id", "company_relationship_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRelationship_first_company_id_second_company_id_comp_key" ON "CompanyRelationship"("first_company_id", "second_company_id", "company_relationship_type_id");

-- CreateIndex
CREATE INDEX "RelatedCompany_FirstCompanyRelationshipUniqueIndex" ON "RelatedCompany"("first_company_id", "company_relationship_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedCompany_first_company_id_second_company_id_company_r_key" ON "RelatedCompany"("first_company_id", "second_company_id", "company_relationship_type_id", "company_relationship_direction", "company_relationship_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_user_id_role_id_company_id_key" ON "UserRole"("user_id", "role_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyServiceAccount_service_name_key" ON "CompanyServiceAccount"("service_name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyServiceAccount_service_name_company_id_key" ON "CompanyServiceAccount"("service_name", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_external_id_key" ON "Product"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_upc_key" ON "Product"("upc");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAvailability_product_id_key" ON "ProductAvailability"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDocument_product_id_key" ON "ProductDocument"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCost_product_id_company_id_start_date_key" ON "ProductCost"("product_id", "company_id", "start_date");

-- CreateIndex
CREATE UNIQUE INDEX "UnitOfMeasurement_unit_name_key" ON "UnitOfMeasurement"("unit_name");

-- CreateIndex
CREATE UNIQUE INDEX "Package_package_name_key" ON "Package"("package_name");

-- CreateIndex
CREATE UNIQUE INDEX "ManufacturerPrice_product_id_company_id_start_date_key" ON "ManufacturerPrice"("product_id", "company_id", "start_date");

-- CreateIndex
CREATE UNIQUE INDEX "RetailerProduct_company_id_product_sku_key" ON "RetailerProduct"("company_id", "product_sku");

-- CreateIndex
CREATE UNIQUE INDEX "RetailerProduct_company_id_product_name_key" ON "RetailerProduct"("company_id", "product_name");

-- CreateIndex
CREATE UNIQUE INDEX "RetailerProductComponent_retailer_product_id_product_id_key" ON "RetailerProductComponent"("retailer_product_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "RetailPrice_retailer_product_id_company_id_start_date_key" ON "RetailPrice"("retailer_product_id", "company_id", "start_date");

-- CreateIndex
CREATE INDEX "PurchaseOrder_company_id_idx" ON "PurchaseOrder"("company_id");

-- CreateIndex
CREATE INDEX "PurchaseOrder_vendorCompanyId_idx" ON "PurchaseOrder"("vendorCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_company_id_order_number_key" ON "PurchaseOrder"("company_id", "order_number");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_product_id_warehouse_id_company_id_key" ON "InventoryItem"("product_id", "warehouse_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItemBarcode_barcode_key" ON "InventoryItemBarcode"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryTransactionSubType_sub_type_name_key" ON "InventoryTransactionSubType"("sub_type_name");

-- CreateIndex
CREATE INDEX "InventoryTransactionSubType_company_id_idx" ON "InventoryTransactionSubType"("company_id");

-- CreateIndex
CREATE INDEX "InventoryLedgerEntry_inventory_item_id_idx" ON "InventoryLedgerEntry"("inventory_item_id");

-- CreateIndex
CREATE INDEX "InventoryLedgerEntry_inventory_item_id_package_id_idx" ON "InventoryLedgerEntry"("inventory_item_id", "package_id");

-- CreateIndex
CREATE INDEX "InventoryLedgerEntry_purchase_order_id_idx" ON "InventoryLedgerEntry"("purchase_order_id");

-- CreateIndex
CREATE INDEX "InventoryLedgerEntry_retail_order_id_idx" ON "InventoryLedgerEntry"("retail_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "RetailOrderLineItem_schedule_id_key" ON "RetailOrderLineItem"("schedule_id");

-- CreateIndex
CREATE INDEX "enterprise_item_company_id" ON "EnterpriseItem"("company_id");

-- CreateIndex
CREATE INDEX "enterprise_item_company_id_item_type_id" ON "EnterpriseItem"("company_id", "item_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "EnterpriseItem_item_id_item_type_id_key" ON "EnterpriseItem"("item_id", "item_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "BillingSplitGroupAccount_account_company_id_split_group_id_key" ON "BillingSplitGroupAccount"("account_company_id", "split_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "Field_company_id_field_name_key" ON "Field"("company_id", "field_name");

-- CreateIndex
CREATE UNIQUE INDEX "FieldLayer_field_id_layer_type_id_manually_generated_layer__key" ON "FieldLayer"("field_id", "layer_type_id", "manually_generated", "layer_name");

-- CreateIndex
CREATE UNIQUE INDEX "GeoLocation_latitude_longitude_key" ON "GeoLocation"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "AssetCategory_asset_category_name_key" ON "AssetCategory"("asset_category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_serial_number_key" ON "Asset"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "BillingAccount_account_number_key" ON "BillingAccount"("account_number");

-- CreateIndex
CREATE INDEX "crop_id_company_id_index" ON "NutrientRemovalRate"("crop_id", "company_id");

-- CreateIndex
CREATE INDEX "crop_id_company_id_nutrient_id_index" ON "NutrientRemovalRate"("crop_id", "company_id", "nutrient_id");

-- CreateIndex
CREATE UNIQUE INDEX "NutrientRemovalRate_crop_id_company_id_nutrient_id_is_dry_m_key" ON "NutrientRemovalRate"("crop_id", "company_id", "nutrient_id", "is_dry_matter", "is_silage", "water_percentage", "removal_rate_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_currency_name_key" ON "Currency"("currency_name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_currency_code_key" ON "Currency"("currency_code");

-- CreateIndex
CREATE UNIQUE INDEX "ChartOfAccount_company_id_account_number_key" ON "ChartOfAccount"("company_id", "account_number");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tag_category_id_fkey" FOREIGN KEY ("tag_category_id") REFERENCES "TagCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taxonomy" ADD CONSTRAINT "Taxonomy_parent_taxonomy_id_fkey" FOREIGN KEY ("parent_taxonomy_id") REFERENCES "Taxonomy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_invited_by_user_id_fkey" FOREIGN KEY ("invited_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalUser" ADD CONSTRAINT "ExternalUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhoneNumber" ADD CONSTRAINT "UserPhoneNumber_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_selectedUserRoleId_fkey" FOREIGN KEY ("selectedUserRoleId") REFERENCES "UserRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_company_type_id_fkey" FOREIGN KEY ("company_type_id") REFERENCES "CompanyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_parent_company_id_fkey" FOREIGN KEY ("parent_company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTag" ADD CONSTRAINT "CompanyTag_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyTag" ADD CONSTRAINT "CompanyTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAddress" ADD CONSTRAINT "CompanyAddress_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAddress" ADD CONSTRAINT "CompanyAddress_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPhoneNumber" ADD CONSTRAINT "CompanyPhoneNumber_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySaaSFeature" ADD CONSTRAINT "CompanySaaSFeature_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRelationship" ADD CONSTRAINT "CompanyRelationship_first_company_id_fkey" FOREIGN KEY ("first_company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRelationship" ADD CONSTRAINT "CompanyRelationship_second_company_id_fkey" FOREIGN KEY ("second_company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRelationship" ADD CONSTRAINT "CompanyRelationship_company_relationship_type_id_fkey" FOREIGN KEY ("company_relationship_type_id") REFERENCES "CompanyRelationshipType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRelationshipAttachment" ADD CONSTRAINT "CompanyRelationshipAttachment_company_relationship_id_fkey" FOREIGN KEY ("company_relationship_id") REFERENCES "CompanyRelationship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedCompany" ADD CONSTRAINT "RelatedCompany_first_company_id_fkey" FOREIGN KEY ("first_company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedCompany" ADD CONSTRAINT "RelatedCompany_second_company_id_fkey" FOREIGN KEY ("second_company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedCompany" ADD CONSTRAINT "RelatedCompany_company_relationship_type_id_fkey" FOREIGN KEY ("company_relationship_type_id") REFERENCES "CompanyRelationshipType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedCompany" ADD CONSTRAINT "RelatedCompany_company_relationship_id_fkey" FOREIGN KEY ("company_relationship_id") REFERENCES "CompanyRelationship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRelationshipTag" ADD CONSTRAINT "CompanyRelationshipTag_company_relationship_id_fkey" FOREIGN KEY ("company_relationship_id") REFERENCES "CompanyRelationship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRelationshipTag" ADD CONSTRAINT "CompanyRelationshipTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDeliveryLocation" ADD CONSTRAINT "CustomerDeliveryLocation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CompanyRelationship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDeliveryLocationAddress" ADD CONSTRAINT "CustomerDeliveryLocationAddress_delivery_location_id_fkey" FOREIGN KEY ("delivery_location_id") REFERENCES "CustomerDeliveryLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDeliveryLocationAddress" ADD CONSTRAINT "CustomerDeliveryLocationAddress_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDeliveryLocationPhoneNumber" ADD CONSTRAINT "CustomerDeliveryLocationPhoneNumber_delivery_location_id_fkey" FOREIGN KEY ("delivery_location_id") REFERENCES "CustomerDeliveryLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyServiceAccount" ADD CONSTRAINT "CompanyServiceAccount_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAvailability" ADD CONSTRAINT "ProductAvailability_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDocument" ADD CONSTRAINT "ProductDocument_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCost" ADD CONSTRAINT "ProductCost_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCost" ADD CONSTRAINT "ProductCost_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitOfMeasurement" ADD CONSTRAINT "UnitOfMeasurement_base_unit_id_fkey" FOREIGN KEY ("base_unit_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitOfMeasurement" ADD CONSTRAINT "UnitOfMeasurement_numerator_unit_id_fkey" FOREIGN KEY ("numerator_unit_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitOfMeasurement" ADD CONSTRAINT "UnitOfMeasurement_denominator_unit_id_fkey" FOREIGN KEY ("denominator_unit_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_unit_of_measurement_id_fkey" FOREIGN KEY ("unit_of_measurement_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_package_type_id_fkey" FOREIGN KEY ("package_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_base_package_id_fkey" FOREIGN KEY ("base_package_id") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversionFactor" ADD CONSTRAINT "ConversionFactor_from_unit_fkey" FOREIGN KEY ("from_unit") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversionFactor" ADD CONSTRAINT "ConversionFactor_to_unit_fkey" FOREIGN KEY ("to_unit") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerPrice" ADD CONSTRAINT "ManufacturerPrice_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerPrice" ADD CONSTRAINT "ManufacturerPrice_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerPrice" ADD CONSTRAINT "ManufacturerPrice_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerProduct" ADD CONSTRAINT "RetailerProduct_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerProduct" ADD CONSTRAINT "RetailerProduct_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "Taxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerProductTag" ADD CONSTRAINT "RetailerProductTag_retailer_product_id_fkey" FOREIGN KEY ("retailer_product_id") REFERENCES "RetailerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerProductTag" ADD CONSTRAINT "RetailerProductTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerProductComponent" ADD CONSTRAINT "RetailerProductComponent_retailer_product_id_fkey" FOREIGN KEY ("retailer_product_id") REFERENCES "RetailerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerProductComponent" ADD CONSTRAINT "RetailerProductComponent_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerProductComponent" ADD CONSTRAINT "RetailerProductComponent_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailPrice" ADD CONSTRAINT "RetailPrice_retailer_product_id_fkey" FOREIGN KEY ("retailer_product_id") REFERENCES "RetailerProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailPrice" ADD CONSTRAINT "RetailPrice_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rebate" ADD CONSTRAINT "Rebate_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rebate" ADD CONSTRAINT "Rebate_rebate_type_id_fkey" FOREIGN KEY ("rebate_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rebate" ADD CONSTRAINT "Rebate_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_discount_type_id_fkey" FOREIGN KEY ("discount_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_retailer_product_id_fkey" FOREIGN KEY ("retailer_product_id") REFERENCES "RetailerProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseTag" ADD CONSTRAINT "WarehouseTag_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseTag" ADD CONSTRAINT "WarehouseTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseAddress" ADD CONSTRAINT "WarehouseAddress_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseAddress" ADD CONSTRAINT "WarehouseAddress_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehousePhoneNumber" ADD CONSTRAINT "WarehousePhoneNumber_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageLocation" ADD CONSTRAINT "StorageLocation_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageLocation" ADD CONSTRAINT "StorageLocation_storage_type_id_fkey" FOREIGN KEY ("storage_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageLocation" ADD CONSTRAINT "StorageLocation_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "StorageLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_purchase_order_status_id_fkey" FOREIGN KEY ("purchase_order_status_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_payment_terms_id_fkey" FOREIGN KEY ("payment_terms_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLineItem" ADD CONSTRAINT "PurchaseOrderLineItem_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLineItem" ADD CONSTRAINT "PurchaseOrderLineItem_unit_of_measurement_id_fkey" FOREIGN KEY ("unit_of_measurement_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLineItem" ADD CONSTRAINT "PurchaseOrderLineItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderLineItem" ADD CONSTRAINT "PurchaseOrderLineItem_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderFee" ADD CONSTRAINT "PurchaseOrderFee_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderFee" ADD CONSTRAINT "PurchaseOrderFee_fee_type_id_fkey" FOREIGN KEY ("fee_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderDiscount" ADD CONSTRAINT "PurchaseOrderDiscount_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderDiscount" ADD CONSTRAINT "PurchaseOrderDiscount_line_item_id_fkey" FOREIGN KEY ("line_item_id") REFERENCES "PurchaseOrderLineItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderApproval" ADD CONSTRAINT "PurchaseOrderApproval_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderApproval" ADD CONSTRAINT "PurchaseOrderApproval_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_unit_of_measurement_id_fkey" FOREIGN KEY ("unit_of_measurement_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItemBarcode" ADD CONSTRAINT "InventoryItemBarcode_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLedgerEntry" ADD CONSTRAINT "InventoryLedgerEntry_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLedgerEntry" ADD CONSTRAINT "InventoryLedgerEntry_transactionSubTypeId_fkey" FOREIGN KEY ("transactionSubTypeId") REFERENCES "InventoryTransactionSubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLedgerEntry" ADD CONSTRAINT "InventoryLedgerEntry_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLedgerEntry" ADD CONSTRAINT "InventoryLedgerEntry_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLedgerEntry" ADD CONSTRAINT "InventoryLedgerEntry_purchase_order_line_item_id_fkey" FOREIGN KEY ("purchase_order_line_item_id") REFERENCES "PurchaseOrderLineItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLedgerEntry" ADD CONSTRAINT "InventoryLedgerEntry_retail_order_id_fkey" FOREIGN KEY ("retail_order_id") REFERENCES "RetailOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLedgerEntry" ADD CONSTRAINT "InventoryLedgerEntry_retail_order_line_item_id_fkey" FOREIGN KEY ("retail_order_line_item_id") REFERENCES "RetailOrderLineItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrder" ADD CONSTRAINT "RetailOrder_sourceCompanyId_fkey" FOREIGN KEY ("sourceCompanyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrder" ADD CONSTRAINT "RetailOrder_customerCompanyId_fkey" FOREIGN KEY ("customerCompanyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrder" ADD CONSTRAINT "RetailOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrder" ADD CONSTRAINT "RetailOrder_order_type_id_fkey" FOREIGN KEY ("order_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrderTag" ADD CONSTRAINT "RetailOrderTag_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "RetailOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrderTag" ADD CONSTRAINT "RetailOrderTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrderLineItem" ADD CONSTRAINT "RetailOrderLineItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "RetailOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrderLineItem" ADD CONSTRAINT "RetailOrderLineItem_retailer_product_id_fkey" FOREIGN KEY ("retailer_product_id") REFERENCES "RetailerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrderLineItem" ADD CONSTRAINT "RetailOrderLineItem_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailOrderLineItem" ADD CONSTRAINT "RetailOrderLineItem_order_type_id_fkey" FOREIGN KEY ("order_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemTag" ADD CONSTRAINT "OrderItemTag_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "RetailOrderLineItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemTag" ADD CONSTRAINT "OrderItemTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderComponentOverride" ADD CONSTRAINT "OrderComponentOverride_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "RetailOrderLineItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderComponentOverride" ADD CONSTRAINT "OrderComponentOverride_retailer_product_component_id_fkey" FOREIGN KEY ("retailer_product_component_id") REFERENCES "RetailerProductComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnterpriseItem" ADD CONSTRAINT "EnterpriseItem_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnterpriseItem" ADD CONSTRAINT "EnterpriseItem_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnterpriseItem" ADD CONSTRAINT "EnterpriseItem_billing_split_group_id_fkey" FOREIGN KEY ("billing_split_group_id") REFERENCES "BillingSplitGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSplitGroup" ADD CONSTRAINT "BillingSplitGroup_billing_split_item_id_fkey" FOREIGN KEY ("billing_split_item_id") REFERENCES "BillingSplitItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSplitGroupAccount" ADD CONSTRAINT "BillingSplitGroupAccount_account_company_id_fkey" FOREIGN KEY ("account_company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSplitGroupAccount" ADD CONSTRAINT "BillingSplitGroupAccount_split_group_id_fkey" FOREIGN KEY ("split_group_id") REFERENCES "BillingSplitGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSplitItem" ADD CONSTRAINT "BillingSplitItem_split_group_id_fkey" FOREIGN KEY ("split_group_id") REFERENCES "BillingSplitGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSplitItem" ADD CONSTRAINT "BillingSplitItem_parent_split_item_id_fkey" FOREIGN KEY ("parent_split_item_id") REFERENCES "BillingSplitItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSplitItem" ADD CONSTRAINT "BillingSplitItem_split_level_id_fkey" FOREIGN KEY ("split_level_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingAccountSplitAllocation" ADD CONSTRAINT "BillingAccountSplitAllocation_split_item_id_fkey" FOREIGN KEY ("split_item_id") REFERENCES "BillingSplitItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_geo_location_id_fkey" FOREIGN KEY ("geo_location_id") REFERENCES "GeoLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldTag" ADD CONSTRAINT "FieldTag_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldTag" ADD CONSTRAINT "FieldTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldVersion" ADD CONSTRAINT "FieldVersion_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldVersionTag" ADD CONSTRAINT "FieldVersionTag_field_version_id_fkey" FOREIGN KEY ("field_version_id") REFERENCES "FieldVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldVersionTag" ADD CONSTRAINT "FieldVersionTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldLayer" ADD CONSTRAINT "FieldLayer_layer_type_id_fkey" FOREIGN KEY ("layer_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldLayer" ADD CONSTRAINT "FieldLayer_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "FieldVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldLayer" ADD CONSTRAINT "FieldLayer_geo_location_id_fkey" FOREIGN KEY ("geo_location_id") REFERENCES "GeoLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldLayerZone" ADD CONSTRAINT "FieldLayerZone_field_layer_id_fkey" FOREIGN KEY ("field_layer_id") REFERENCES "FieldLayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldLayerZone" ADD CONSTRAINT "FieldLayerZone_geo_location_id_fkey" FOREIGN KEY ("geo_location_id") REFERENCES "GeoLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowingSeason" ADD CONSTRAINT "GrowingSeason_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowingSeason" ADD CONSTRAINT "GrowingSeason_yield_goal_measurement_id_fkey" FOREIGN KEY ("yield_goal_measurement_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowingSeason" ADD CONSTRAINT "GrowingSeason_yield_measurement_id_fkey" FOREIGN KEY ("yield_measurement_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowingSeasonTag" ADD CONSTRAINT "GrowingSeasonTag_growing_season_id_fkey" FOREIGN KEY ("growing_season_id") REFERENCES "GrowingSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowingSeasonTag" ADD CONSTRAINT "GrowingSeasonTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_performed_by_id_fkey" FOREIGN KEY ("performed_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_asset_category_id_fkey" FOREIGN KEY ("asset_category_id") REFERENCES "AssetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetCapacity" ADD CONSTRAINT "AssetCapacity_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetCapacity" ADD CONSTRAINT "AssetCapacity_unit_of_measurement_id_fkey" FOREIGN KEY ("unit_of_measurement_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "RetailOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstantMessage" ADD CONSTRAINT "InstantMessage_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CompanyRelationship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstantMessageAttachment" ADD CONSTRAINT "InstantMessageAttachment_instant_message_id_fkey" FOREIGN KEY ("instant_message_id") REFERENCES "InstantMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingAccount" ADD CONSTRAINT "BillingAccount_account_type_id_fkey" FOREIGN KEY ("account_type_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingAccount" ADD CONSTRAINT "BillingAccount_account_sub_type_id_fkey" FOREIGN KEY ("account_sub_type_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionJournalEntry" ADD CONSTRAINT "TransactionJournalEntry_billing_account_id_fkey" FOREIGN KEY ("billing_account_id") REFERENCES "BillingAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionJournalEntryLine" ADD CONSTRAINT "TransactionJournalEntryLine_billing_account_id_fkey" FOREIGN KEY ("billing_account_id") REFERENCES "BillingAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionJournalEntryLine" ADD CONSTRAINT "TransactionJournalEntryLine_journal_entry_id_fkey" FOREIGN KEY ("journal_entry_id") REFERENCES "TransactionJournalEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutrientRemovalRate" ADD CONSTRAINT "NutrientRemovalRate_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutrientRemovalRate" ADD CONSTRAINT "NutrientRemovalRate_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutrientRemovalRate" ADD CONSTRAINT "NutrientRemovalRate_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutrientRemovalRate" ADD CONSTRAINT "NutrientRemovalRate_removal_rate_unit_id_fkey" FOREIGN KEY ("removal_rate_unit_id") REFERENCES "UnitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartOfAccount" ADD CONSTRAINT "ChartOfAccount_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartOfAccount" ADD CONSTRAINT "ChartOfAccount_account_sub_type_id_fkey" FOREIGN KEY ("account_sub_type_id") REFERENCES "ChartOfAccountSubType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartOfAccount" ADD CONSTRAINT "ChartOfAccount_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartOfAccount" ADD CONSTRAINT "ChartOfAccount_parent_account_id_fkey" FOREIGN KEY ("parent_account_id") REFERENCES "ChartOfAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
