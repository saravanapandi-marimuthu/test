namespace Horizen.Data.Domain.Accounts.Enums;

public enum AccountType
{
    // Asset
    Bank,
    OtherCurrentAsset,
    FixedAsset,
    OtherAsset,
    AccountsReceivable,

    // Equity
    Equity,

    // Expense
    Expense,
    OtherExpense,
    CostOfGoodsSold,

    // Liability
    AccountsPayable,
    CreditCard,
    LongTermLiability,
    OtherCurrentLiability,

    // Revenue
    Income,
    OtherIncome,
}
