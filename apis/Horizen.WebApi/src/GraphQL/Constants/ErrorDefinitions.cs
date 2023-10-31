public enum ErrorCode
{
    #region General Error codes
    UnexpectedError,
    #endregion

    #region Configuration Error codes
    GetTagCategoriesError,
    GetTagsError,
    GetUnitOfMeasurementsError,
    GetPaymentTermsError,
    GetPackageError,
    CreatePackageError,
    #endregion

    #region User Error codes
    GetUserInfoError,
    GetUsersError,
    GetUserError,
    InviteUsersError,

    #endregion

    #region Company Error codes
    GetRelatedCompaniesError,
    CreateCompanyError,
    CreateRelatedCompanyError,
    GetCompanyError,
    LinkCompaniesError,
    #endregion

    #region Product Error codes
    GetManufacturerProductsError,
    #endregion

    #region Warehouse Error codes
    CreateWarehouseError,
    CreateStorageLocationError,
    UpdateStorageLocationError,
    GetWarehouseError,
    #endregion

    #region PurchaseOrder Error codes
    CreatePurchaseOrderError,
    GetPurchaseOrdersError,

    #endregion

    #region RetailerProduct Error codes
    GetRetailerProductsError,
    GetRetailerProductError,
    CreateRetailerProductError,
    UpdateRetailerProductError,
    DeleteRetailerProductError
    #endregion
}

public static class ErrorDefinitions
{
    public static readonly Dictionary<ErrorCode, string> ErrorMessages =
        new()
        {
            { ErrorCode.UnexpectedError, "Unexpected error." },
            { ErrorCode.GetTagCategoriesError, "Error retrieving tag categories." },
            { ErrorCode.GetTagsError, "Error retrieving tags." },
            { ErrorCode.GetUnitOfMeasurementsError, "Error retrieving unit of measurements." },
            { ErrorCode.GetPaymentTermsError, "Error retrieving payment terms." },
            { ErrorCode.GetPackageError, "Error retrieving package." },
            { ErrorCode.CreatePackageError, "Error creating package." },
            { ErrorCode.GetUserInfoError, "Error retrieving user information." },
            { ErrorCode.GetUsersError, "Error retrieving users." },
            { ErrorCode.GetUserError, "Error retrieving user." },
            { ErrorCode.InviteUsersError, "Error inviting users." },
            { ErrorCode.CreateCompanyError, "Error creating company." },
            { ErrorCode.GetCompanyError, "Error retrieving company." },
            { ErrorCode.CreateRelatedCompanyError, "Error creating related company." },
            { ErrorCode.LinkCompaniesError, "Error linking companies." },
            { ErrorCode.GetRelatedCompaniesError, "Error retrieving related companies." },
            { ErrorCode.GetManufacturerProductsError, "Error retrieving manufacturer products." },
            { ErrorCode.CreateWarehouseError, "Error creating warehouse." },
            { ErrorCode.GetWarehouseError, "Error retrieving warehouse." },
            { ErrorCode.CreateStorageLocationError, "Error creating storage location." },
            { ErrorCode.UpdateStorageLocationError, "Error updating storage location." },
            { ErrorCode.GetPurchaseOrdersError, "Error retrieving purchase orders." },
            { ErrorCode.CreatePurchaseOrderError, "Error creating purchase order." },
            { ErrorCode.GetRetailerProductsError, "Error retrieving retailer products." },
            { ErrorCode.GetRetailerProductError, "Error retrieving retailer product." },
            { ErrorCode.CreateRetailerProductError, "Error creating retailer product." },
            { ErrorCode.UpdateRetailerProductError, "Error updating retailer product." },
            { ErrorCode.DeleteRetailerProductError, "Error deleting retailer product." },
        };

    public static string GetErrorMessage(ErrorCode errorCode)
    {
        if (ErrorMessages.ContainsKey(errorCode))
        {
            return ErrorMessages[errorCode];
        }

        return "Unknown error";
    }
}
